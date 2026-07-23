# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the CMS platform to Vercel and other cloud providers.

## Vercel Frontend Deployment

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account (recommended for easier deployment)
- Git installed

### Step 1: Prepare the Repository

1. **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create a new repository (e.g., `cms-platform`)
   - Follow GitHub's instructions to push your code

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard

2. **Create New Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Connect your GitHub account
   - Select the repository

3. **Configure Project**
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: ./ (leave default)
   - **Environment Variables**: Add the following:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend is live at the provided URL

### Step 3: Backend Deployment

You have several options for the backend:

#### Option A: Railway.app (Recommended)

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "Create New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository

3. **Add MongoDB**
   - Click "Add Service"
   - Search for "MongoDB"
   - Click "MongoDB"
   - Railway will automatically add the MongoDB plugin

4. **Configure Backend**
   - Click on "backend" service
   - Add environment variables:
     - `NODE_ENV`: production
     - `JWT_SECRET`: (generate a strong random string)
     - `PORT`: 5000
   - MongoDB URI will be automatically set by Railway

5. **Deploy**
   - Railway automatically deploys when you push to GitHub

#### Option B: Render.com

1. **Sign up at Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select repository

3. **Configure**
   - **Name**: cms-backend
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: (strong random string)
   - `NODE_ENV`: production
   - `PORT`: 5000

5. **Deploy**
   - Click "Create Web Service"
   - Render will deploy automatically

#### Option C: AWS Elastic Beanstalk

1. **Install AWS CLI**
   - Follow https://aws.amazon.com/cli/

2. **Initialize Elastic Beanstalk**
```bash
cd backend
eb init -p "Node.js 20 running on 64bit Amazon Linux 2" cms-api
eb create cms-api-env
```

3. **Configure Environment**
```bash
eb setenv \
  MONGODB_URI=your-mongodb-uri \
  JWT_SECRET=your-secret \
  NODE_ENV=production
```

4. **Deploy**
```bash
eb deploy
```

### Step 4: Database Setup

#### Option A: MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a cluster

2. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Save username and password

3. **Whitelist IP**
   - Go to Network Access
   - Add IP: 0.0.0.0/0 (for development/testing)
   - For production, add specific IPs

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>:<password>` with your credentials

5. **Update Backend**
   - Set `MONGODB_URI` environment variable to your connection string

#### Option B: AWS DocumentDB

```bash
# Create DocumentDB cluster in AWS Console, then use connection string
MONGODB_URI=mongodb://user:password@your-cluster.amazon.com:27017/cms
```

### Step 5: Update Environment Variables

After deployment, update your environment variables:

**Frontend (.env.production)**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

**Backend (Railway/Render/AWS)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cms
JWT_SECRET=<generate-strong-random-string>
NODE_ENV=production
PORT=5000
```

### Step 6: Seed Production Database

```bash
# SSH into your backend or run via remote command
npm run seed

# or
npm run seed-extended
```

### Step 7: Test Deployment

1. **Test Backend API**
```bash
curl https://your-backend-url.com/health
```

2. **Test Login**
```bash
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

3. **Test Frontend**
   - Visit your Vercel frontend URL
   - Try logging in

## Complete Deployment Checklist

- [ ] Backend deployed (Railway/Render/AWS)
- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with users and sample pages
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set in both frontend and backend
- [ ] `NEXT_PUBLIC_API_URL` points to correct backend
- [ ] Login works on frontend
- [ ] Can create and publish pages
- [ ] Published pages visible on public site
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Monitoring/logging setup
- [ ] Backup strategy documented

## Setting Up Custom Domain

### Vercel Frontend
1. Go to Project Settings → Domains
2. Enter your domain
3. Update DNS records at your domain provider

### Backend (Railway)
1. Go to "Domain" in service settings
2. Add your custom domain
3. Update DNS records

## Monitoring and Logging

### Vercel
- Built-in analytics at https://vercel.com/dashboard
- Error tracking via integrations

### Railway/Render
- Built-in logs in dashboard
- View logs for debugging

### AWS CloudWatch
- Monitor Elastic Beanstalk in AWS Console
- Set up alarms for failures

## Scaling

As your CMS grows:

1. **Database**
   - Enable replication with MongoDB Atlas
   - Increase resources as needed

2. **Backend**
   - Configure auto-scaling on Railway/Render/AWS
   - Consider caching with Redis

3. **Frontend**
   - Vercel handles scaling automatically
   - Monitor analytics for bottlenecks

## Cost Optimization

1. **MongoDB Atlas** - Free tier includes 512MB storage
2. **Vercel** - Free tier includes unlimited deployments
3. **Railway** - Free tier includes $5 credit monthly
4. **Render** - Free tier available with limitations

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
railway logs    # or render logs
npm run start   # test locally first
```

### Database Connection Failed
```bash
# Check MongoDB URI
# Ensure IP is whitelisted in MongoDB Atlas
# Test connection: mongosh <connection-string>
```

### Frontend Can't Connect to Backend
```bash
# Check NEXT_PUBLIC_API_URL
# Verify backend is running: curl https://your-backend-url.com/health
# Check CORS settings in backend
```

### Deployment Fails
1. Check build logs in Vercel/Railway/Render
2. Verify environment variables are set
3. Test locally: `npm run build && npm start`

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://railway.app/reference/cli
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.mongodb.com/manual/
- Express.js: https://expressjs.com/
- Next.js: https://nextjs.org/docs

---

**Your CMS is now deployed and ready to serve content in production!**
