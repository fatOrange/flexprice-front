# Function to create .env file
function Create-EnvFile {
    if (Test-Path ".env") {
        Write-Host "Using existing .env file"
        return
    }

    @"
VITE_API_URL=https://api-dev.cloud.flexprice.io/v1
VITE_ENVIRONMENT=self-hosted
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "Created .env file with required configuration"
}

# Function to compute the SHA-256 of .env for the Docker config cache key
function Get-EnvHash {
    return (Get-FileHash -Path ".env" -Algorithm SHA256 -ErrorAction Stop).Hash.ToLower()
}

# Function to build and run Docker
function Docker-BuildAndRun {
    $envHash = Get-EnvHash

    Write-Host "Building Docker image..."
    $env:DOCKER_BUILDKIT = "1"
    docker build --target production --build-arg "FRONTEND_CONFIG_HASH=$envHash" --secret "id=frontend_env,src=.env" -t flexprice-front .

    Write-Host "Running Docker container..."
    docker run -d -p 3000:80 flexprice-front
}

# Main execution
Write-Host "Starting FlexPrice Frontend Setup..."

# Create .env file
Create-EnvFile

# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install Docker first."
    exit 1
}

# Build and run Docker
Docker-BuildAndRun

Write-Host "Setup completed! The application should be running at http://localhost:3000"
