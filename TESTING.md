# Testing Guide

Complete testing guide for the CMS platform.

## Manual Testing

### 1. Authentication Testing

#### Register New User
1. Start the application
2. Go to http://localhost:3000
3. Try to register a new user (note: endpoint exists but UI only has login)
4. Try logging in with:
   - **Email**: admin@example.com
   - **Password**: admin123

**Expected**: Login successful, redirected to admin dashboard

#### Invalid Credentials
1. Try login with wrong password
2. Try login with non-existent email

**Expected**: Error message displayed

### 2. Admin Dashboard Testing

#### Page List
1. Log in successfully
2. Verify all sample pages are displayed
3. Check pagination works (if many pages)
4. Filter by published/draft status

**Expected**: All pages loaded correctly with proper status

#### Create New Page
1. Click "New Page" button
2. Fill in:
   - Title: "Test Page"
   - Slug: "test-page"
   - Description: "A test page"
3. Add multiple blocks:
   - Heading
   - Paragraph
   - List
   - Equation
   - Table
4. Click "Save Page"

**Expected**: Page created and appears in list

#### Edit Page
1. Click "Edit" on any page
2. Modify content
3. Change publish status
4. Save

**Expected**: Changes saved and visible in list

#### Delete Page
1. Click "Delete" on any page
2. Confirm deletion

**Expected**: Page removed from list

### 3. Content Blocks Testing

#### Heading Block
- Add with different levels (h1-h6)
- Verify text renders correctly

#### Paragraph Block
- Add long text
- Verify text wrapping works

#### List Block
- Add multiple items
- Verify formatting

#### Table Block
- Add headers and rows
- Verify table renders correctly

#### Equation Block
- Add LaTeX equations:
  - `a^2 + b^2 = c^2`
  - `E = mc^2`
  - `\phi = \frac{1 + \sqrt{5}}{2}`

**Expected**: All blocks display correctly

### 4. Public Site Testing

#### View Published Pages
1. Go to http://localhost:3000/public
2. Verify all published pages are listed
3. Click on a page

**Expected**: Page displays with all content blocks rendered

#### Page Details
1. View a published page
2. Check author information
3. Verify view counter increments

**Expected**: Page information displayed correctly

### 5. API Testing

#### Health Check
```bash
curl http://localhost:5000/health
```

**Expected**: `{"status":"ok"}`

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'
```

**Expected**: User created, token returned

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Expected**: Token returned

#### Get Current User
```bash
TOKEN="your_token_here"
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected**: User info returned

#### Get All Pages
```bash
TOKEN="your_token_here"
curl http://localhost:5000/api/pages \
  -H "Authorization: Bearer $TOKEN"
```

**Expected**: Array of pages returned

#### Create Page
```bash
TOKEN="your_token_here"
curl -X POST http://localhost:5000/api/pages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "API Test Page",
    "slug": "api-test",
    "description": "Created via API",
    "blocks": [
      {
        "id": "1",
        "type": "heading",
        "level": 1,
        "content": {"text": "Hello World"}
      }
    ],
    "published": true
  }'
```

**Expected**: Page created, page object returned

#### Get Public Page
```bash
curl http://localhost:5000/api/pages/slug/welcome
```

**Expected**: Welcome page returned (no token needed)

### 6. Error Handling Testing

#### Missing Authorization
```bash
curl http://localhost:5000/api/pages
```

**Expected**: 401 error - "No token provided"

#### Invalid Token
```bash
curl http://localhost:5000/api/pages \
  -H "Authorization: Bearer invalid_token"
```

**Expected**: 401 error - "Invalid token"

#### Page Not Found
```bash
curl http://localhost:5000/api/pages/nonexistent-slug
```

**Expected**: 404 error - "Page not found"

### 7. Responsive Design Testing

Test on different screen sizes:
- Mobile (375px)
- Tablet (768px)
- Desktop (1024px+)

**Expected**: Layout adapts properly

## Automated Testing Ideas

### Unit Tests
```javascript
// Test block rendering
// Test API endpoints
// Test Redux actions
```

### Integration Tests
```javascript
// Test user flow: login → create page → publish
// Test API: create page → fetch page → update page
```

### E2E Tests
```javascript
// Using Playwright or Cypress
// Test complete user workflows
```

## Performance Testing

### Frontend
```bash
# Lighthouse audit
pnpm build
# Check in Chrome DevTools

# Bundle size
npm run build
```

### Backend
```bash
# Load testing
npm install -g autocannon
autocannon http://localhost:5000/api/pages
```

## Security Testing

1. **SQL Injection** (N/A - using MongoDB)
2. **XSS** - Test with HTML in fields
3. **CSRF** - Verify CORS is configured
4. **JWT Validation** - Expired tokens, invalid signatures
5. **Rate Limiting** - Set up with express-rate-limit

## Regression Testing Checklist

After changes, verify:
- [ ] Login still works
- [ ] Dashboard loads
- [ ] Can create page
- [ ] Can edit page
- [ ] Can delete page
- [ ] Can publish page
- [ ] Public site shows published pages
- [ ] All block types work
- [ ] No console errors
- [ ] API endpoints work

## Browser Compatibility

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Accessibility Testing

Use:
- axe DevTools
- WAVE
- Lighthouse

Check for:
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Form labels

## Load Testing

```bash
# Test with many concurrent users
ab -n 1000 -c 100 http://localhost:3000/
ab -n 1000 -c 100 http://localhost:5000/api/pages
```

## Database Testing

```javascript
// Test queries
// Test indexes
// Test concurrent writes
```

## Deployment Testing

1. Build Docker images locally
2. Test with docker-compose
3. Verify all services start
4. Test complete workflow
5. Check logs for errors

---

## Quick Test Checklist

- [ ] Backend API running
- [ ] Frontend running
- [ ] Can login with admin@example.com / admin123
- [ ] Can create a page with all block types
- [ ] Can publish a page
- [ ] Published page visible on public site
- [ ] Can view page and see content correctly
- [ ] No console errors
- [ ] Page works on mobile view

---

**All systems ready for production!**
