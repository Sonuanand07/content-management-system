# Deployment Checklist - CMS Platform

## Pre-Deployment

- [ ] All code changes committed to Git
- [ ] Build completes successfully: `pnpm build`
- [ ] No TypeScript errors
- [ ] Environment variables documented
- [ ] NETWORK_FIX.md reviewed
- [ ] Database backup created (if using existing MongoDB)

## Backend Deployment (Render)

### Step 1: Prepare Backend
- [ ] Set `MONGODB_URI` environment variable
  - Option A: Use MongoDB Atlas cloud (recommended)
  - Option B: Use local MongoDB if self-hosting
  - Option C: Skip if using demo mode only
- [ ] Set `JWT_SECRET` to a secure random string
  ```bash
  openssl rand -base64 32
  ```
- [ ] Set `PORT=5000` (default for render)
- [ ] Verify `backend/package.json` is in repo root

### Step 2: Deploy
- [ ] Connect Render to GitHub repo
- [ ] Configure build command: `cd backend && npm install && npm run build`
- [ ] Configure start command: `node src/index.js`
- [ ] Deploy
- [ ] Wait for deployment to complete
- [ ] Test health endpoint: `curl https://<your-backend>.onrender.com/health`

### Step 3: Verify Backend
- [ ] Health check returns `{ "status": "ok" }`
- [ ] Backend logs show: `[v0] Server running on http://localhost:5000`
- [ ] If no MongoDB: `[v0] Database not connected - using demo/API mode only`
- [ ] CORS is enabled (test with curl)

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
- [ ] Update `.env` with backend API URL
  ```
  NEXT_PUBLIC_API_URL=https://<your-backend>.onrender.com/api
  ```
- [ ] Build succeeds locally: `pnpm build`
- [ ] No errors in build output
- [ ] Verify routes are correct

### Step 2: Deploy
- [ ] Connect Vercel to GitHub repo
- [ ] Set environment variable: `NEXT_PUBLIC_API_URL`
- [ ] Deploy
- [ ] Wait for deployment to complete
- [ ] Test access to site

### Step 3: Verify Frontend
- [ ] Homepage loads: shows login form
- [ ] API connection indicator shows status (green/red)
- [ ] Login with demo credentials works
- [ ] Dashboard loads with sample pages
- [ ] No 404 errors

## Post-Deployment Testing

### Login Flow
- [ ] Navigate to deployed site
- [ ] See "Connected" status indicator
- [ ] Login with admin@example.com / admin123
- [ ] Redirected to /admin/dashboard
- [ ] Dashboard shows pages

### Public Site
- [ ] Navigate to /public
- [ ] See list of published pages
- [ ] Click a page to view content
- [ ] Content renders correctly

### Error Scenarios
- [ ] Simulate network error (block API in DevTools)
- [ ] Login still works with demo credentials
- [ ] See appropriate error messages
- [ ] Can still navigate to dashboard

### Database (if configured)
- [ ] Create a new page in admin
- [ ] Publish the page
- [ ] View on public site
- [ ] Verify it persists after refresh
- [ ] Check MongoDB for new entry

## Monitoring

### Set Up Alerts For
- [ ] Backend 500 errors (check Render logs)
- [ ] API timeouts (check network latency)
- [ ] Database connection failures
- [ ] Frontend build failures

### Regular Checks
- [ ] Backend health endpoint responding
- [ ] No error logs in Render console
- [ ] Frontend performance metrics (Vercel Analytics)
- [ ] Database size and performance (if using MongoDB Atlas)

## Rollback Plan

If deployment fails:

1. **Frontend Rollback**
   - Vercel: Click "Deployments" → Select previous working version → Click "Promote to Production"
   - Takes effect immediately

2. **Backend Rollback**
   - Render: Go to Deployment History → Select previous version → Redeploy
   - May take 1-2 minutes

3. **Database Rollback**
   - If using MongoDB Atlas: Use backups feature
   - If self-hosted: Restore from backup

## Performance Optimization

- [ ] Enable Gzip compression on backend
- [ ] Set up CDN for static assets (Vercel default)
- [ ] Configure database indexes for common queries
- [ ] Monitor API response times

## Security

- [ ] JWT_SECRET is strong and unique
- [ ] CORS is properly restricted (or set to wildcard for testing)
- [ ] Environment variables not committed to Git
- [ ] MongoDB connection string uses TLS
- [ ] No console.log with sensitive data in production

## Documentation Updates

- [ ] Update README with deployed URLs
- [ ] Document any custom configuration
- [ ] Share deployment URLs with team
- [ ] Document database access procedures

## Sign-Off

- [ ] Project Manager: Verified all requirements met
- [ ] QA: Tested all critical paths
- [ ] DevOps: Verified infrastructure
- [ ] Stakeholders: Approved for production

---

## Quick Reference

### Environment Variables Needed

**Backend (Render)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cms
JWT_SECRET=<secure-random-string>
PORT=5000
NODE_ENV=production
```

**Frontend (Vercel)**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

### Deployed URLs

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Backend Health: `https://your-backend.onrender.com/health`

### Demo Credentials

```
admin@example.com / admin123
editor@example.com / editor123
viewer@example.com / viewer123
```

---

**Last Updated**: July 2026
**Status**: Ready for Production
**Tested On**: Render + Vercel
