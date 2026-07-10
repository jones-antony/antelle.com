param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$SiteRoot = Join-Path $RepoRoot "Site"
$DistRoot = Join-Path $SiteRoot "dist"
$SettingsPath = Join-Path $PSScriptRoot "ftp.settings.ps1"

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
  throw "This deployment script is configured for standard FTP. Set `$FtpUseSsl = `$false in deploy/ftp.settings.ps1."
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

function Get-RelativePath {
  param(
    [string]$BasePath,
    [string]$TargetPath
  )

  $baseFullPath = [System.IO.Path]::GetFullPath($BasePath).TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
  $targetFullPath = [System.IO.Path]::GetFullPath($TargetPath)
  $baseUri = [System.Uri]::new($baseFullPath)
  $targetUri = [System.Uri]::new($targetFullPath)

  return [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($targetUri).ToString()).Replace("/", [System.IO.Path]::DirectorySeparatorChar)
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

function Invoke-FtpRequest {
  param(
    [string]$Method,
    [string]$RemotePath,
    [string]$LocalFile
  )

  $uri = ConvertTo-FtpUri -RemotePath $RemotePath
  $request = [System.Net.FtpWebRequest]::Create($uri)
  $request.Credentials = [System.Net.NetworkCredential]::new($FtpUsername, $FtpPassword)
  $request.Method = $Method
  $request.UseBinary = $true
  $request.UsePassive = [bool]$FtpUsePassive
  $request.EnableSsl = $false

  if ($LocalFile) {
    $bytes = [System.IO.File]::ReadAllBytes($LocalFile)
    $request.ContentLength = $bytes.Length
    $stream = $request.GetRequestStream()
    try {
      $stream.Write($bytes, 0, $bytes.Length)
    } finally {
      $stream.Dispose()
    }
  }

  $response = $request.GetResponse()
  try {
    return $response.StatusDescription
  } finally {
    $response.Dispose()
  }
}

function Ensure-FtpDirectory {
  param([string]$RemoteDirectory)

  $clean = ($RemoteDirectory -replace "\\", "/").Trim("/")
  if ([string]::IsNullOrWhiteSpace($clean)) {
    return
  }

  $current = ""
  foreach ($part in $clean.Split("/")) {
    $current = Join-FtpPath -Left $current -Right $part
    try {
      Invoke-FtpRequest -Method ([System.Net.WebRequestMethods+Ftp]::MakeDirectory) -RemotePath $current | Out-Null
      Write-Host "Created remote directory: $current"
    } catch {
      # FTP servers usually return an error when the directory already exists.
    }
  }
}

if (-not $SkipBuild) {
  Push-Location $SiteRoot
  try {
    npm run build
  } finally {
    Pop-Location
  }
}

if (-not (Test-Path -LiteralPath $DistRoot)) {
  throw "Build output not found: $DistRoot"
}

$remoteRoot = ($FtpRemotePath -replace "\\", "/")
if ([string]::IsNullOrWhiteSpace($remoteRoot)) {
  $remoteRoot = "/"
}

Ensure-FtpDirectory -RemoteDirectory $remoteRoot

$files = Get-ChildItem -LiteralPath $DistRoot -Recurse -File
foreach ($file in $files) {
  $relative = (Get-RelativePath -BasePath $DistRoot -TargetPath $file.FullName) -replace "\\", "/"
  $remoteFile = Join-FtpPath -Left $remoteRoot -Right $relative
  $remoteDirectory = Split-Path -Parent ($remoteFile -replace "/", [System.IO.Path]::DirectorySeparatorChar)
  $remoteDirectory = ($remoteDirectory -replace "\\", "/")

  Ensure-FtpDirectory -RemoteDirectory $remoteDirectory
  Invoke-FtpRequest -Method ([System.Net.WebRequestMethods+Ftp]::UploadFile) -RemotePath $remoteFile -LocalFile $file.FullName | Out-Null
  Write-Host "Uploaded: $relative"
}

Write-Host "FTP deployment complete. Uploaded $($files.Count) file(s)."
