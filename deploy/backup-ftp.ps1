param(
  [string]$BackupName
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$SettingsPath = Join-Path $PSScriptRoot "ftp.settings.ps1"
$BackupParent = Join-Path $RepoRoot "backups"

if (-not (Test-Path -LiteralPath $SettingsPath)) {
  throw "Missing FTP settings file: $SettingsPath. Copy deploy/ftp.settings.example.ps1 to deploy/ftp.settings.ps1 and populate it."
}

. $SettingsPath

foreach ($name in @("FtpHost", "FtpUsername", "FtpPassword", "FtpRemotePath")) {
  if (-not (Get-Variable -Name $name -ValueOnly -ErrorAction SilentlyContinue)) {
    throw "Missing required setting: `$$name"
  }
}

if (-not $FtpPort) {
  $FtpPort = 21
}

if ($FtpUseSsl) {
  throw "This backup script is configured for standard FTP. Set `$FtpUseSsl = `$false in deploy/ftp.settings.ps1."
}

function Join-FtpPath {
  param(
    [string]$Left,
    [string]$Right
  )

  $leftClean = ($Left -replace "\\", "/").TrimEnd("/")
  $rightClean = ($Right -replace "\\", "/").TrimStart("/")

  if ([string]::IsNullOrWhiteSpace($leftClean)) {
    return "/$rightClean"
  }

  if ([string]::IsNullOrWhiteSpace($rightClean)) {
    return $leftClean
  }

  return "$leftClean/$rightClean"
}

function ConvertTo-FtpUri {
  param([string]$RemotePath)

  $hostValue = $FtpHost.Trim()
  if ($hostValue -notmatch "^ftp://") {
    $hostValue = "ftp://$hostValue"
  }

  $builder = [System.UriBuilder]::new($hostValue)
  $builder.Scheme = "ftp"
  $builder.Port = [int]$FtpPort

  $normalisedPath = ($RemotePath -replace "\\", "/")
  if (-not $normalisedPath.StartsWith("/")) {
    $normalisedPath = "/$normalisedPath"
  }

  $builder.Path = ($normalisedPath -split "/" | Where-Object { $_ -ne "" } | ForEach-Object {
    [System.Uri]::EscapeDataString($_)
  }) -join "/"

  return $builder.Uri.AbsoluteUri
}

function New-FtpRequest {
  param(
    [string]$Method,
    [string]$RemotePath
  )

  $request = [System.Net.FtpWebRequest]::Create((ConvertTo-FtpUri -RemotePath $RemotePath))
  $request.Credentials = [System.Net.NetworkCredential]::new($FtpUsername, $FtpPassword)
  $request.Method = $Method
  $request.UseBinary = $true
  $request.UsePassive = [bool]$FtpUsePassive
  $request.EnableSsl = $false
  return $request
}

function Get-FtpDirectoryListing {
  param([string]$RemotePath)

  $request = New-FtpRequest -Method ([System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails) -RemotePath $RemotePath
  $response = $request.GetResponse()
  try {
    $reader = [System.IO.StreamReader]::new($response.GetResponseStream())
    try {
      $lines = @()
      while (-not $reader.EndOfStream) {
        $line = $reader.ReadLine()
        if (-not [string]::IsNullOrWhiteSpace($line)) {
          $lines += $line
        }
      }
      return $lines
    } finally {
      $reader.Dispose()
    }
  } finally {
    $response.Dispose()
  }
}

function ConvertFrom-FtpListingLine {
  param([string]$Line)

  $isDirectory = $false
  $name = $null

  if ($Line -match "^\d{2}-\d{2}-\d{2}\s+\d{2}:\d{2}[AP]M\s+(<DIR>|\d+)\s+(.+)$") {
    $isDirectory = $Matches[1] -eq "<DIR>"
    $name = $Matches[2]
  } elseif ($Line -match "^([dl-])[rwx-]{9}\s+\d+\s+\S+\s+\S+\s+\d+\s+\w+\s+\d+\s+(?:\d{2}:\d{2}|\d{4})\s+(.+)$") {
    $isDirectory = $Matches[1] -eq "d"
    $name = $Matches[2]
  } else {
    return $null
  }

  if ($name -in @(".", "..")) {
    return $null
  }

  [pscustomobject]@{
    Name = $name
    IsDirectory = $isDirectory
  }
}

function Save-FtpFile {
  param(
    [string]$RemotePath,
    [string]$LocalPath
  )

  $localDirectory = Split-Path -Parent $LocalPath
  if (-not (Test-Path -LiteralPath $localDirectory)) {
    New-Item -ItemType Directory -Path $localDirectory -Force | Out-Null
  }

  $request = New-FtpRequest -Method ([System.Net.WebRequestMethods+Ftp]::DownloadFile) -RemotePath $RemotePath
  $response = $request.GetResponse()
  try {
    $inputStream = $response.GetResponseStream()
    $outputStream = [System.IO.File]::Create($LocalPath)
    try {
      $inputStream.CopyTo($outputStream)
    } finally {
      $outputStream.Dispose()
      $inputStream.Dispose()
    }
  } finally {
    $response.Dispose()
  }
}

function Save-FtpDirectory {
  param(
    [string]$RemotePath,
    [string]$LocalPath
  )

  if (-not (Test-Path -LiteralPath $LocalPath)) {
    New-Item -ItemType Directory -Path $LocalPath -Force | Out-Null
  }

  $entries = Get-FtpDirectoryListing -RemotePath $RemotePath
  foreach ($line in $entries) {
    $entry = ConvertFrom-FtpListingLine -Line $line
    if (-not $entry) {
      Write-Warning "Skipping unrecognised FTP listing entry: $line"
      continue
    }

    $remoteChild = Join-FtpPath -Left $RemotePath -Right $entry.Name
    $localChild = Join-Path $LocalPath $entry.Name

    if ($entry.IsDirectory) {
      Write-Host "Backing up directory: $remoteChild"
      Save-FtpDirectory -RemotePath $remoteChild -LocalPath $localChild
    } else {
      Write-Host "Backing up file: $remoteChild"
      Save-FtpFile -RemotePath $remoteChild -LocalPath $localChild
    }
  }
}

if ([string]::IsNullOrWhiteSpace($BackupName)) {
  $BackupName = "antelle.com_$(Get-Date -Format yyyyMMdd)"
}

New-Item -ItemType Directory -Path $BackupParent -Force | Out-Null

$backupRoot = Join-Path $BackupParent $BackupName
$zipPath = Join-Path $BackupParent "$BackupName.zip"

if ((Test-Path -LiteralPath $backupRoot) -or (Test-Path -LiteralPath $zipPath)) {
  $BackupName = "$BackupName`_$(Get-Date -Format HHmmss)"
  $backupRoot = Join-Path $BackupParent $BackupName
  $zipPath = Join-Path $BackupParent "$BackupName.zip"
}

$remoteRoot = ($FtpRemotePath -replace "\\", "/")
if ([string]::IsNullOrWhiteSpace($remoteRoot)) {
  $remoteRoot = "/"
}

Write-Host "Starting FTP backup from $remoteRoot"
Save-FtpDirectory -RemotePath $remoteRoot -LocalPath $backupRoot

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $backupRoot "*") -DestinationPath $zipPath -Force
Remove-Item -LiteralPath $backupRoot -Recurse -Force

Write-Host "FTP backup complete: $zipPath"
