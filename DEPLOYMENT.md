# Deployment Guide

## Prerequisites

- Node.js 20+
- MongoDB 7+
- npm or pnpm

## Quick Start with Docker Compose

The easiest way to run the entire stack locally or in production.

### Prerequisites
- Docker
- Docker Compose

### Setup

1. **Clone the repository**
```bash
git clone <repo-url>
cd cms-platform
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Seed the database** (first time only)
```bash
docker-compose exec backend npm run seed
```

4. **Access the application**
- Admin Panel: http://localhost:3000
- Public Site: http://localhost:3000/public
- API Health: http://localhost:5000/health

5. **Login credentials**
- Email: admin@example.com
- Password: admin123

### Stop the services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f mongodb    # Database logs
```

---

## Manual Setup (Local Development)

### 1. MongoDB Setup

#### Option A: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get the connection string
5. Update `MONGODB_URI` in `.env` files

#### Option B: Install MongoDB Locally

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Run installer
- Start MongoDB service

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/cms

# Seed the database
npm run seed

# Start development server
npm run dev
```

Backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
# From project root
pnpm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
pnpm dev
```

Frontend will run on http://localhost:3000

---

## Vercel Deployment

### Backend Deployment

The backend can be deployed as an API route or serverless function. However, it's recommended to use a dedicated Node.js hosting:

#### Option 1: Railway.app

1. Push code to GitHub
2. Connect GitHub to Railway
3. Create a new project
4. Add MongoDB add-on
5. Configure environment variables
6. Deploy

#### Option 2: Render.com

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect to backend/ folder
4. Add MongoDB connection
5. Configure environment variables
6. Deploy

#### Option 3: AWS/DigitalOcean/Linode

Use their app platform or container deployment services.

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
```

Update `NEXT_PUBLIC_API_URL` to point to your deployed backend.

---

## Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cms

# Authentication
JWT_SECRET=your-very-secure-random-string-here

# CORS (optional)
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Production Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use MongoDB Atlas or managed database service
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS for API
- [ ] Configure CORS properly
- [ ] Setup monitoring and logging
- [ ] Enable rate limiting
- [ ] Setup backup strategy
- [ ] Test all features in production
- [ ] Setup CI/CD pipeline

---

## Troubleshooting

### MongoDB Connection Issues

```bash
# Test connection
mongosh "mongodb://localhost:27017/cms"
```

### Backend Won't Start

1. Check if MongoDB is running: `mongosh`
2. Check if port 5000 is available: `lsof -i :5000`
3. Check .env file has correct MONGODB_URI
4. Check logs: `npm run dev` shows errors

### Frontend Can't Connect to Backend

1. Check NEXT_PUBLIC_API_URL in .env.local
2. Ensure backend is running: `curl http://localhost:5000/health`
3. Check browser console for CORS errors
4. Verify firewall rules

### Database Seeding Failed

```bash
# Clear and reseed
db.dropDatabase()  # in MongoDB
npm run seed
```

---

## Scaling Considerations

- Use MongoDB replication for high availability
- Implement caching layer (Redis)
- Use CDN for static assets
- Setup database indexing
- Implement rate limiting
- Use load balancer for multiple backend instances
- Setup monitoring and alerting

---

## Support

For deployment issues, check:
- Backend logs: `docker-compose logs backend`
- Frontend logs: `docker-compose logs frontend`
- MongoDB logs: `docker-compose logs mongodb`
- Environment variables are set correctly
- Firewall rules allow connections
