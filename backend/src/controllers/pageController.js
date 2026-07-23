import Page from '../models/Page.js';

// Create a new page
export const createPage = async (req, res) => {
  try {
    const { title, slug, description, blocks = [], metadata = {} } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ error: 'Page with this slug already exists' });
    }

    const page = new Page({
      title,
      slug,
      description,
      blocks,
      author: req.user.id,
      lastEditor: req.user.id,
      metadata,
    });

    await page.save();
    await page.populate('author', 'name email');
    await page.populate('lastEditor', 'name email');

    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pages
export const getPages = async (req, res) => {
  try {
    const { published, limit = 10, skip = 0 } = req.query;
    const filter = {};

    if (published === 'true') {
      filter.published = true;
    }

    const pages = await Page.find(filter)
      .populate('author', 'name email')
      .populate('lastEditor', 'name email')
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Page.countDocuments(filter);

    res.json({ pages, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get page by ID
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
      .populate('author', 'name email')
      .populate('lastEditor', 'name email');

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Increment view count for published pages
    if (page.published) {
      page.metadata.views = (page.metadata.views || 0) + 1;
      await page.save();
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get page by slug
export const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, published: true })
      .populate('author', 'name email');

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Increment view count
    page.metadata.views = (page.metadata.views || 0) + 1;
    await page.save();

    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update page
export const updatePage = async (req, res) => {
  try {
    const { title, description, blocks, published, metadata } = req.body;
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Check authorization
    if (page.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this page' });
    }

    if (title) page.title = title;
    if (description !== undefined) page.description = description;
    if (blocks) page.blocks = blocks;
    if (metadata) page.metadata = { ...page.metadata, ...metadata };

    if (published !== undefined) {
      page.published = published;
      if (published && !page.publishedAt) {
        page.publishedAt = new Date();
      }
    }

    page.lastEditor = req.user.id;
    await page.save();
    await page.populate('author', 'name email');
    await page.populate('lastEditor', 'name email');

    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete page
export const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Check authorization
    if (page.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this page' });
    }

    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
