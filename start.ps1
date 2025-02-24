# Function to check if a command exists
function Test-Command($cmd) {
    return [bool](Get-Command -Name $cmd -ErrorAction SilentlyContinue)
}

# Set working directory to script location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Starting CodeLingo development environment..." -ForegroundColor Cyan

# Check if Node.js is installed
if (-not (Test-Command "node")) {
    Write-Host "Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (-not (Test-Command "npm")) {
    Write-Host "npm is not installed. Please install Node.js which includes npm" -ForegroundColor Red
    exit 1
}

# Set Node.js to use legacy OpenSSL provider
$env:NODE_OPTIONS = "--openssl-legacy-provider"

# Navigate to codelingo directory
Set-Location ".\codelingo"

# Navigate to client directory and install dependencies
Set-Location ".\client"

# Clean npm cache and remove node_modules
Write-Host "Cleaning previous installation..." -ForegroundColor Yellow
Remove-Item -Path ".\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\package-lock.json" -Force -ErrorAction SilentlyContinue
npm cache clean --force

# Install core webpack dependencies first
Write-Host "Installing webpack dependencies..." -ForegroundColor Yellow
npm install webpack@5.75.0 webpack-dev-server@4.11.1 html-webpack-plugin@5.5.0 --save-dev --save-exact

# Install other dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Yellow
npm install ajv@8.12.0 --save-exact
npm install ajv-keywords@5.1.0 --save-exact
npm install --legacy-peer-deps

# If installation failed, try alternative installation method
if ($LASTEXITCODE -ne 0) {
    Write-Host "First installation attempt failed, trying alternative method..." -ForegroundColor Yellow
    npm install ajv@6.12.6 ajv-keywords@3.5.2 --save-exact
    npm install webpack@4.44.2 webpack-dev-server@3.11.1 html-webpack-plugin@4.5.0 --save-dev --save-exact
    npm install --legacy-peer-deps
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    Set-Location $scriptPath
    exit 1
}

# Start development server
Write-Host "Starting client development server..." -ForegroundColor Green
npm start

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to start development server" -ForegroundColor Red
    Set-Location $scriptPath
    exit 1
}

# Return to original directory
Set-Location $scriptPath
