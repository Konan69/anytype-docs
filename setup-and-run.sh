#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
  echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

# Check if Node.js is installed
print_header "Checking prerequisites"
if ! command -v node &> /dev/null; then
  echo -e "${RED}Node.js is not installed. Please install Node.js first and then run this script again.${NC}"
  echo -e "Visit ${YELLOW}https://nodejs.org/${NC} to download and install Node.js."
  exit 1
fi

echo -e "${GREEN}✓${NC} Node.js is installed ($(node -v))"

if ! command -v npm &> /dev/null; then
  echo -e "${RED}npm is not installed. Please install npm first and then run this script again.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} npm is installed ($(npm -v))"

# Navigate to the docs directory
print_header "Setting up the documentation"
cd anytype-docs || { 
  echo -e "${RED}Error: anytype-docs directory not found.${NC}"; 
  exit 1; 
}

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the development server
print_header "Starting Docusaurus development server"
echo -e "The documentation site will be available at ${YELLOW}http://localhost:3000${NC}"
echo -e "Press ${YELLOW}Ctrl+C${NC} to stop the server\n"

npm start 