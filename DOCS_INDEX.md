# CMS Platform - Documentation Index

Welcome! This is your guide to all project documentation.

## Getting Started (START HERE)

**New to the project?** Read these in order:

1. **[QUICKSTART.md](./QUICKSTART.md)** ⭐ START HERE
   - 5-minute setup guide
   - Docker or local development
   - First steps to create content
   - Basic troubleshooting

2. **[README.md](./README.md)** 
   - Project overview
   - Architecture and structure
   - Feature list
   - Local setup instructions
   - API endpoint reference
   - Technology stack

3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - Complete project deliverables
   - File structure breakdown
   - Feature checklist
   - Technology details
   - Future enhancements

---

## Development & Deployment

### Setup & Configuration

- **[setup-env.sh](./setup-env.sh)** - Automated environment setup
- **[start-dev.sh](./start-dev.sh)** - Development startup script
- **[.env](./.env)** - Frontend environment variables
- **[backend/.env](./backend/.env.example)** - Backend environment variables

### Deployment Guides

1. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - General deployment guide
   - Docker Compose deployment
   - Manual setup instructions
   - MongoDB Atlas setup
   - Multiple hosting options (Railway, Render, AWS, etc.)
   - Environment variables
   - Troubleshooting

2. **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Vercel-specific guide
   - Frontend deployment to Vercel
   - Backend deployment to Railway/Render
   - MongoDB Atlas setup
   - Custom domain configuration
   - Scaling considerations
   - Cost optimization

### Docker Setup

- **[docker-compose.yml](./docker-compose.yml)** - Multi-container orchestration
- **[Dockerfile](./Dockerfile)** - Frontend Docker image
- **[backend/Dockerfile](./backend/Dockerfile)** - Backend Docker image
- **[.dockerignore](./.dockerignore)** - Frontend Docker ignore
- **[backend/.dockerignore](./backend/.dockerignore)** - Backend Docker ignore

---

## Testing & Quality

### Testing Guide
- **[TESTING.md](./TESTING.md)** - Complete testing documentation
  - Manual testing procedures
  - API testing with curl
  - Error handling tests
  - Performance testing
  - Security testing
  - Regression checklist
  - Browser compatibility
  - Accessibility testing

### Code Quality
- **Linting**: TypeScript enabled
- **Type Checking**: Full TypeScript support
- **Error Handling**: Comprehensive error messages
- **Logging**: Console and API logs

---

## Implementation Details

### Frontend (Next.js + React)

**Components:**
- `components/LoginForm.tsx` - Authentication UI
- `components/AdminDashboard.tsx` - Admin dashboard
- `components/PageEditor.tsx` - Block-based editor
- `components/PublicPage.tsx` - Public page display
- `components/PublicIndex.tsx` - Homepage

**Pages:**
- `app/page.tsx` - Login page
- `app/admin/dashboard/page.tsx` - Admin interface
- `app/public/page.tsx` - Public homepage
- `app/page/[slug]/page.tsx` - Public page display

**State Management:**
- `lib/store.ts` - Redux store and slices

### Backend (Express.js + MongoDB)

**Models:**
- `backend/src/models/User.js` - User schema
- `backend/src/models/Page.js` - Page schema with blocks

**Controllers:**
- `backend/src/controllers/authController.js` - Authentication logic
- `backend/src/controllers/pageController.js` - Page management

**Routes:**
- `backend/src/routes/auth.js` - Auth endpoints
- `backend/src/routes/pages.js` - Page endpoints

**Configuration:**
- `backend/src/config/db.js` - MongoDB connection
- `backend/src/middleware/auth.js` - Authentication middleware

**Scripts:**
- `backend/scripts/seed.js` - Basic seed data
- `backend/scripts/seed-extended.js` - Extended seed data

---

## API Reference

### Endpoints

**Authentication** (see README.md):
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

**Pages** (see README.md):
- `GET /api/pages` - List pages
- `POST /api/pages` - Create page
- `GET /api/pages/:id` - Get page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page
- `GET /api/pages/slug/:slug` - Get published page

See **[README.md](./README.md)** for complete API details.

---

## Configuration & Environment

### Environment Variables

**Frontend (.env)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (backend/.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cms
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Database Configuration

- **Local**: MongoDB on localhost:27017
- **Docker**: MongoDB service in docker-compose
- **Production**: MongoDB Atlas connection string

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

---

## Project File Structure

```
cms-platform/
│
├── Documentation (You are here)
│   ├── QUICKSTART.md              # Start here!
│   ├── README.md                  # Full docs
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── VERCEL_DEPLOYMENT.md       # Vercel guide
│   ├── TESTING.md                 # Testing guide
│   ├── PROJECT_SUMMARY.md         # Complete summary
│   └── DOCS_INDEX.md             # This file
│
├── Frontend
│   ├── app/                       # Next.js pages
│   ├── components/                # React components
│   ├── lib/                       # Utilities (Redux store)
│   ├── public/                    # Static files
│   ├── package.json
│   ├── next.config.mjs
│   ├── tsconfig.json
│   └── Dockerfile
│
├── Backend
│   ├── src/
│   │   ├── models/               # Database schemas
│   │   ├── controllers/          # Business logic
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Auth, error handling
│   │   ├── config/               # Database config
│   │   └── index.js              # Entry point
│   ├── scripts/                  # Database seeding
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── Infrastructure
│   ├── docker-compose.yml        # Multi-container setup
│   ├── .dockerignore
│   ├── backend/.dockerignore
│   ├── setup-env.sh              # Setup script
│   └── start-dev.sh              # Dev startup
│
└── Configuration
    ├── .env                      # Frontend env
    ├── .env.production           # Production env
    └── .gitignore
```

---

## Quick Navigation

### I want to...

**Get Started**
→ Read [QUICKSTART.md](./QUICKSTART.md)

**Setup Locally**
→ See [README.md](./README.md) "Setup" section

**Deploy to Production**
→ Choose: [DEPLOYMENT.md](./DEPLOYMENT.md) or [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

**Test the Application**
→ Read [TESTING.md](./TESTING.md)

**Understand the Architecture**
→ See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

**Configure Environment**
→ Check [DEPLOYMENT.md](./DEPLOYMENT.md) "Environment Variables" section

**Find API Documentation**
→ See [README.md](./README.md) "API Endpoints" section

**Troubleshoot Issues**
→ Check [DEPLOYMENT.md](./DEPLOYMENT.md) "Troubleshooting" section

**Learn About Technology**
→ See [README.md](./README.md) "Technology Stack" section

**See What's Included**
→ Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) "Completed Checklist"

---

## Documentation Features

- ✅ Step-by-step setup guides
- ✅ Docker and local development
- ✅ Multiple deployment platforms
- ✅ Complete API reference
- ✅ Testing procedures
- ✅ Troubleshooting guides
- ✅ Code examples
- ✅ Best practices

---

## Getting Help

### If You Encounter Issues

1. **Check Troubleshooting** - [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting) has solutions
2. **Review TESTING.md** - [TESTING.md](./TESTING.md) shows testing procedures
3. **Check Logs** - Run `docker-compose logs` to see service logs
4. **Review Code** - Source code is well-commented
5. **Refer to Guides** - All setup steps are documented

### Common Issues

- **Docker won't start** → See [QUICKSTART.md](./QUICKSTART.md#troubleshooting)
- **Backend connection fails** → Check [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting)
- **Database issues** → See DEPLOYMENT.md "Database Configuration"
- **Deployment problems** → Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

## Development Workflow

### Daily Development
```bash
./start-dev.sh        # Setup
docker-compose up -d  # Start services
# OR
mongod               # Start MongoDB
cd backend && npm run dev
pnpm dev            # Frontend dev
```

### Making Changes
1. Edit code in `app/`, `components/`, or `backend/src/`
2. Hot reload will update automatically
3. Test with procedures in [TESTING.md](./TESTING.md)
4. Commit and push to GitHub

### Deploying
1. Follow [DEPLOYMENT.md](./DEPLOYMENT.md) or [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
2. Set environment variables
3. Deploy frontend to Vercel
4. Deploy backend to Railway/Render
5. Test in production

---

## Resources

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Deployment Platforms
- [Vercel](https://vercel.com)
- [Railway](https://railway.app)
- [Render](https://render.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## Support Matrix

| Topic | Documentation |
|-------|---|
| Quick Start | [QUICKSTART.md](./QUICKSTART.md) |
| Architecture | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |
| API Reference | [README.md](./README.md) |
| Local Setup | [README.md](./README.md) |
| Docker Setup | [README.md](./README.md) |
| Deployment | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Vercel Deployment | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) |
| Testing | [TESTING.md](./TESTING.md) |
| Troubleshooting | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Feature List | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |

---

## Version Information

- **Next.js**: 16.2.6
- **React**: 19
- **Express.js**: 4.18
- **MongoDB**: 7
- **Node.js**: 20+
- **Docker**: Latest

---

**Start with [QUICKSTART.md](./QUICKSTART.md) to get up and running in 5 minutes!**

*Last Updated: 2026*
