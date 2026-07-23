# CMS Platform

A full-stack Content Management System with block-based editor, admin panel, and public frontend.

## Architecture

- **Backend**: Express.js with MongoDB
- **Admin Frontend**: Next.js 16 with Redux
- **Public Frontend**: Next.js 16 pages
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based stateless auth

## Project Structure

```
├── backend/                 # Express API server
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── models/         # Mongoose schemas
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, error handling
│   │   └── index.js        # Entry point
│   ├── scripts/
│   │   └── seed.js         # Database seeding
│   └── package.json
├── app/                     # Next.js app
│   ├── admin/              # Admin panel routes
│   ├── public/             # Public routes
│   ├── page/               # Public page display
│   ├── page.tsx            # Login page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── LoginForm.tsx
│   ├── AdminDashboard.tsx
│   ├── PageEditor.tsx
│   ├── PublicPage.tsx
│   └── PublicIndex.tsx
├── lib/
│   └── store.ts            # Redux store
├── docker-compose.yml      # Multi-container setup
└── package.json
```

## Setup

### Local Development (with Docker)

1. **Install Docker and Docker Compose**

2. **Start services**:
```bash
docker-compose up -d
```

3. **Seed database** (run once):
```bash
docker-compose exec backend npm run seed
```

4. **Access the application**:
   - Admin Panel: http://localhost:3000 (login with admin@example.com / admin123)
   - Public Site: http://localhost:3000/public
   - API: http://localhost:5000/api

### Local Development (without Docker)

1. **Install MongoDB locally** and ensure it's running on port 27017

2. **Setup Backend**:
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

3. **Setup Frontend** (in another terminal):
```bash
pnpm install
pnpm dev
```

4. **Access the application**:
   - Admin Panel: http://localhost:3000
   - Public Site: http://localhost:3000/public
   - API: http://localhost:5000/api

## Default Credentials

- **Admin**: admin@example.com / admin123
- **Editor**: editor@example.com / editor123

## Features

### Content Management
- Block-based editor supporting:
  - Headings (h1-h6)
  - Paragraphs
  - Lists
  - Tables
  - Equations (LaTeX)
  - Images (framework support)

### Admin Panel
- Create, read, update, delete pages
- Publish/draft status
- Role-based access control (admin, editor, viewer)
- View tracking and metadata

### Public Frontend
- Display published pages
- Dynamic page routing by slug
- Author information and metadata
- View counter

### API
- RESTful endpoints for authentication and page management
- JWT token-based auth
- Role-based authorization
- Error handling and validation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Pages
- `GET /api/pages` - Get all pages (protected)
- `GET /api/pages/:id` - Get page by ID (protected)
- `GET /api/pages/slug/:slug` - Get published page by slug (public)
- `POST /api/pages` - Create page (protected, editor+)
- `PUT /api/pages/:id` - Update page (protected, editor+)
- `DELETE /api/pages/:id` - Delete page (protected, editor+)

## Technology Stack

### Backend
- Express.js 4.18
- MongoDB 7 / Mongoose 7.6
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- Next.js 16
- React 19
- Redux Toolkit for state management
- Axios for HTTP client
- Tailwind CSS for styling

## Deployment

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

### Environment Variables

Create `.env.example` files for each service:

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/cms
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=production
```

**Next.js (.env.local)**
```
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```

## Database Schema

### Users Collection
- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String
- `role`: String (admin | editor | viewer)
- `createdAt`: Date
- `updatedAt`: Date

### Pages Collection
- `_id`: ObjectId
- `title`: String
- `slug`: String (unique)
- `description`: String
- `blocks`: Array of content blocks
- `published`: Boolean
- `publishedAt`: Date
- `author`: ObjectId (ref User)
- `lastEditor`: ObjectId (ref User)
- `metadata`: Object with views, tags, SEO
- `createdAt`: Date
- `updatedAt`: Date

### Content Block Structure
```javascript
{
  id: String,
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'equation' | 'image',
  content: Mixed,
  level: Number // for headings
}
```

## Development

### Adding New Block Types

1. Update `Block` schema in `backend/src/models/Page.js`
2. Add editor UI in `PageEditor.tsx`
3. Add renderer in `PublicPage.tsx`

### Adding New Routes

Backend API routes go in `backend/src/routes/`
Frontend routes go in `app/`

## Next Steps

- Add image upload support with file storage
- Implement version history/rollback
- Add collaborative editing with websockets
- Setup CI/CD pipeline
- Add analytics and monitoring
- Setup full-text search
- Implement audit logging

## Support

For issues or questions, please open an issue in the repository.
