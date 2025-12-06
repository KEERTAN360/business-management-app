$MavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$JdkUrl = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u402-b06/OpenJDK8U-jdk_x64_windows_hotspot_8u402b06.zip"
$InstallDir = Join-Path $PSScriptRoot ".mvn-portable"
$MavenZip = Join-Path $InstallDir "maven.zip"
$JdkZip = Join-Path $InstallDir "jdk.zip"

if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
}

if (-not (Test-Path "$InstallDir\apache-maven-3.9.6")) {
    Write-Host "Downloading Maven..."
    Invoke-WebRequest -Uri $MavenUrl -OutFile $MavenZip
    
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $MavenZip -DestinationPath $InstallDir -Force
    
    Remove-Item $MavenZip
}

if (-not (Test-Path "$InstallDir\jdk8u402-b06")) {
    Write-Host "Downloading JDK 8..."
    Invoke-WebRequest -Uri $JdkUrl -OutFile $JdkZip
    
    Write-Host "Extracting JDK 8..."
    Expand-Archive -Path $JdkZip -DestinationPath $InstallDir -Force
    
    Remove-Item $JdkZip
}

$MvnCmd = Join-Path $InstallDir "apache-maven-3.9.6\bin\mvn.cmd"
$JdkHome = Join-Path $InstallDir "jdk8u402-b06"
$env:JAVA_HOME = $JdkHome
$env:Path = "$JdkHome\bin;$env:Path"

Write-Host "Using Maven at: $MvnCmd"
Write-Host "Using JDK at: $JdkHome"

& $MvnCmd -version
& $MvnCmd clean spring-boot:run
