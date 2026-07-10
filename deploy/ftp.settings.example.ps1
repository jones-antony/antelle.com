# Copy this file to ftp.settings.ps1 and populate the values.
# ftp.settings.ps1 is ignored by Git and must not be committed.

$FtpHost = "ftp.example.com"
$FtpPort = 21
$FtpUsername = "username"
$FtpPassword = "password"

# Remote web root or folder to receive the contents of Site/dist.
# Examples: "/", "/wwwroot", "/public_html"
$FtpRemotePath = "/"

# Standard FTP settings.
$FtpUsePassive = $true
$FtpUseSsl = $false
