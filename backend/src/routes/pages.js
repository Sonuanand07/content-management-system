import express from 'express';
import {
  createPage,
  getPages,
  getPageById,
  getPageBySlug,
  updatePage,
  deletePage,
} from '../controllers/pageController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/slug/:slug', getPageBySlug);

// Protected routes
router.post('/', authenticate, authorize(['admin', 'editor']), createPage);
router.get('/', authenticate, getPages);
router.get('/:id', authenticate, getPageById);
router.put('/:id', authenticate, authorize(['admin', 'editor']), updatePage);
router.delete('/:id', authenticate, authorize(['admin', 'editor']), deletePage);

export default router;
