# CMS Platform - Quick Start Guide

## 5-Minute Setup

### Option 1: Docker Compose (Recommended)

**Requirements**: Docker and Docker Compose installed

```bash
# Start all services
docker-compose up -d

# Seed database (first time only)
docker-compose exec backend npm run seed

# Done! Access at:
# - Admin: http://localhost:3000
# - Public: http://localhost:3000/public
# - API: http://localhost:5000/health
```

**Login:**
- Email: admin@example.com
- Password: admin123

---

### Option 2: Local Development

**Requirements**: Node.js 20+, MongoDB 7+

```bash
# 1. Setup environment
./setup-env.sh

# 2. Start MongoDB (in terminal 1)
mongod

# 3. Start backend (in terminal 2)
cd backend
npm install
npm run seed
npm run dev
# Wait for: "Server running on http://localhost:5000"

# 4. Start frontend (in terminal 3)
pnpm install
pnpm dev
# Wait for: "Local: http://localhost:3000"
```

**Access:**
- Admin: http://localhost:3000
- Public: http://localhost:3000/public

---

## First Steps

### 1. Login
1. Go to http://localhost:3000
2. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`

### 2. Explore Admin Dashboard
- View all pages and their status
- See author information
- Check published/draft status

### 3. Create Your First Page
1. Click "New Page"
2. Enter:
   - **Title**: "My First Page"
   - **Slug**: "my-first-page"
   - **Description**: "This is my first page"
3. Add content blocks:
   - Click "+ Heading" and type "Welcome"
   - Click "+ Paragraph" and add some text
   - Click "+ List" and add items
4. Click "Save Page"
5. Check "Publish" and save again

### 4. View Published Page
1. Go to http://localhost:3000/public
2. Click your newly created page
3. See it rendered on the public site

### 5. Try All Block Types
1. Edit your page
2. Add different block types:
   - **Heading** (try different levels)
   - **Paragraph** (long text)
   - **List** (multiple items)
   - **Table** (headers: Name, Age, City; add rows)
   - **Equation** (try: `a^2 + b^2 = c^2`)

---

## Common Tasks

### Create a New User
Currently, you need to use the API or seed more users. See backend/scripts/seed-extended.js

### Change Admin Password
Users: admin, editor, and viewer accounts are pre-created. To change password, update seed script or modify database directly.

### Add More Pages
1. Go to admin dashboard
2. Click "New Page"
3. Fill in details
4. Add blocks
5. Save and publish

### Make Content Public
1. Edit a page
2. Check the "Publish" checkbox
3. Click "Save Page"
4. It will appear on http://localhost:3000/public

### Deploy to Production
See VERCEL_DEPLOYMENT.md or DEPLOYMENT.md for full instructions:
- Frontend: Deploy to Vercel
- Backend: Deploy to Railway/Render
- Database: Use MongoDB Atlas

---

## What's Included

- **Backend API** - Express.js with MongoDB
- **Admin Panel** - Next.js with Redux
- **Public Site** - Next.js pages
- **Database** - MongoDB with sample data
- **Block Editor** - 6 content block types
- **Authentication** - JWT-based login
- **Documentation** - Complete guides
- **Docker Setup** - Production-ready

---

## File Structure

```
cms-platform/
├── app/                    # Frontend (Next.js)
├── backend/               # API (Express.js)
├── components/            # React components
├── lib/                   # Utilities
├── docker-compose.yml     # Multi-container setup
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
└── TESTING.md            # Testing guide
```

---

## Troubleshooting

### Docker Won't Start
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Kill processes if needed
docker-compose down
docker ps -a
docker rm container_id
```

### Backend Not Connecting
```bash
# Check MongoDB is running
docker-compose logs mongodb

# Check backend logs
docker-compose logs backend

# Test API
curl http://localhost:5000/health
```

### Frontend Can't Connect to Backend
1. Check `.env` file has `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
2. Check backend is running: `curl http://localhost:5000/health`
3. Clear browser cache and rebuild: `pnpm build`

### Database Seeding Failed
```bash
# Clear and reseed
docker-compose exec backend npm run seed

# Or use extended seed
docker-compose exec backend npm run seed-extended
```

### Port Already in Use
Change ports in docker-compose.yml:
```yaml
ports:
  - "3001:3000"  # Frontend on 3001
  - "5001:5000"  # Backend on 5001
```

---

## Next Steps

1. **Explore Features** - Create more pages and content
2. **Customize Styling** - Edit Tailwind CSS classes
3. **Add Users** - Create editor and viewer accounts
4. **Deploy** - Move to production (see DEPLOYMENT.md)
5. **Scale** - Add more features (see PROJECT_SUMMARY.md)

---

## Quick Reference

### URLs
- Admin Panel: http://localhost:3000
- Public Site: http://localhost:3000/public
- API Health: http://localhost:5000/health
- API Docs: See API_ENDPOINTS in README.md

### Credentials
- Email: `admin@example.com`
- Password: `admin123`

### Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Run seed
docker-compose exec backend npm run seed

# SSH into container
docker-compose exec backend sh
docker-compose exec frontend sh

# Stop and remove everything
docker-compose down -v
```

### Directories
- Frontend code: `./app` and `./components`
- Backend code: `./backend/src`
- Styles: `./app/globals.css`
- Configuration: `.env` and `backend/.env`

---

## Support

For more information:
- Full docs: See README.md
- Deployment: See DEPLOYMENT.md or VERCEL_DEPLOYMENT.md
- Testing: See TESTING.md
- Troubleshooting: See DEPLOYMENT.md troubleshooting section

---

## Success Indicators

✅ **Setup Complete When:**
- Docker shows all services running: `docker-compose ps`
- Login works at http://localhost:3000
- Can see sample pages in admin dashboard
- Can view pages on http://localhost:3000/public
- API responds: `curl http://localhost:5000/health`

---

**Enjoy building with your CMS platform!**

Questions? Check the troubleshooting section or refer to full documentation.
