import express from 'express';

const router = express.Router();

const DEMO_USERS = {
  'admin@example.com': { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
  'editor@example.com': { id: '2', email: 'editor@example.com', name: 'Editor User', role: 'editor' },
  'viewer@example.com': { id: '3', email: 'viewer@example.com', name: 'Viewer User', role: 'viewer' },
};

const DEMO_PAGES = [
  {
    _id: '1',
    title: 'Welcome to CMS',
    slug: 'welcome',
    blocks: [
      { id: '1', type: 'heading', content: { level: 1, text: 'Welcome to Content Management System' } },
      { id: '2', type: 'paragraph', content: { text: 'This is a demo page showing the block-based content editor. In production, all content is stored in MongoDB.' } },
      { id: '3', type: 'heading', content: { level: 2, text: 'Features' } },
      { id: '4', type: 'list', content: { items: ['Block-based editing', 'Publish/Draft status', 'User roles and permissions', 'Real-time collaboration'] } },
    ],
    status: 'published',
    author: 'Admin User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Getting Started',
    slug: 'getting-started',
    blocks: [
      { id: '1', type: 'heading', content: { level: 1, text: 'Getting Started Guide' } },
      { id: '2', type: 'paragraph', content: { text: 'Learn how to use the CMS platform to create and manage your content.' } },
    ],
    status: 'published',
    author: 'Editor User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get demo user
router.get('/user/:email', (req, res) => {
  const user = DEMO_USERS[req.params.email];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get all demo pages
router.get('/pages', (req, res) => {
  res.json({ pages: DEMO_PAGES, total: DEMO_PAGES.length });
});

// Get demo page by ID
router.get('/pages/:id', (req, res) => {
  const page = DEMO_PAGES.find(p => p._id === req.params.id);
  if (page) {
    res.json(page);
  } else {
    res.status(404).json({ error: 'Page not found' });
  }
});

export default router;
