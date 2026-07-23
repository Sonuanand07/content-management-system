#!/bin/bash

# CMS Platform Environment Setup Script

echo "=== CMS Platform Environment Setup ==="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
# Frontend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
    echo ".env created successfully"
else
    echo ".env already exists"
fi

# Check if backend/.env exists
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env file..."
    cat > backend/.env << 'EOF'
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cms

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
EOF
    echo "backend/.env created successfully"
else
    echo "backend/.env already exists"
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "Creating .env.production file..."
    cat > .env.production << 'EOF'
# Update this with your production API URL
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
EOF
    echo ".env.production created successfully"
else
    echo ".env.production already exists"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI if not using localhost"
echo "2. Update backend/.env JWT_SECRET with a strong secret for production"
echo "3. Update .env.production with your production API URL"
echo ""
echo "For development with Docker Compose:"
echo "  docker-compose up -d"
echo ""
echo "For local development:"
echo "  # Start MongoDB"
echo "  mongod"
echo ""
echo "  # In another terminal, start backend"
echo "  cd backend && npm run seed && npm run dev"
echo ""
echo "  # In another terminal, start frontend"
echo "  pnpm dev"
