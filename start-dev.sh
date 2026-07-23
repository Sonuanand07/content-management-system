#!/bin/bash

# CMS Platform Development Startup Script

echo "========================================"
echo "CMS Platform - Development Startup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js installed${NC}"

# Check npm/pnpm
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm globally..."
    npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm available${NC}"

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB installed locally${NC}"
    MONGODB_LOCAL=true
else
    echo -e "${YELLOW}✗ MongoDB not installed locally${NC}"
    echo "   Use Docker: docker run -d --name cms-mongodb -p 27017:27017 mongo:7"
    echo "   Or install: https://docs.mongodb.com/manual/installation/"
    MONGODB_LOCAL=false
fi

echo ""

# Setup environment files
echo "Setting up environment files..."

if [ ! -f .env ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env
    echo -e "${GREEN}✓ Created .env${NC}"
else
    echo -e "${GREEN}✓ .env already exists${NC}"
fi

if [ ! -f backend/.env ]; then
    cat > backend/.env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cms
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
EOF
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${GREEN}✓ backend/.env already exists${NC}"
fi

echo ""

# Install dependencies
echo "Installing dependencies..."
pnpm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd backend
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""

echo "To start the development servers:"
echo ""
echo "1. Start MongoDB (if not running):"
if [ "$MONGODB_LOCAL" = true ]; then
    echo "   mongod"
else
    echo "   docker run -d --name cms-mongodb -p 27017:27017 mongo:7"
fi
echo ""
echo "2. In one terminal, start the backend:"
echo "   cd backend && npm run seed && npm run dev"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   pnpm dev"
echo ""
echo "4. Access the application:"
echo "   Admin Panel: http://localhost:3000"
echo "   Public Site: http://localhost:3000/public"
echo "   Backend API: http://localhost:5000/api"
echo ""
echo "5. Login credentials:"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo ""
echo "6. Or run everything with Docker:"
echo "   docker-compose up -d"
echo ""
