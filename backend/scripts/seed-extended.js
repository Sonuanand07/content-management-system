import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Page from '../src/models/Page.js';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cms';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    // Create admin user
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    });

    // Create editor user
    const editorUser = await User.create({
      email: 'editor@example.com',
      password: 'editor123',
      name: 'Editor User',
      role: 'editor',
    });

    // Create viewer user
    const viewerUser = await User.create({
      email: 'viewer@example.com',
      password: 'viewer123',
      name: 'Viewer User',
      role: 'viewer',
    });

    console.log('Created users:', adminUser.email, editorUser.email, viewerUser.email);

    // Create comprehensive sample pages
    const samplePages = [
      {
        title: 'Welcome to Our CMS',
        slug: 'welcome',
        description: 'This is the welcome page of our CMS platform.',
        published: true,
        author: adminUser._id,
        lastEditor: adminUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'Welcome to Our CMS' },
          },
          {
            id: '2',
            type: 'paragraph',
            content: {
              text: 'This is a powerful content management system that allows you to create and manage rich content with various block types including headings, paragraphs, lists, tables, equations, and images.',
            },
          },
          {
            id: '3',
            type: 'heading',
            level: 2,
            content: { text: 'Core Features' },
          },
          {
            id: '4',
            type: 'list',
            content: {
              items: [
                'Block-based editor for flexible content creation',
                'Multiple content block types (heading, paragraph, list, table, equation)',
                'Role-based access control (admin, editor, viewer)',
                'Version history and revision tracking',
                'SEO optimization with metadata',
                'Published/draft content status',
              ],
            },
          },
        ],
        metadata: {
          tags: ['welcome', 'cms', 'introduction', 'features'],
          seo: {
            title: 'Welcome to Our CMS - Content Management System',
            description: 'A powerful and flexible CMS platform for managing content',
            keywords: ['cms', 'content', 'management', 'platform'],
          },
        },
      },
      {
        title: 'Getting Started Guide',
        slug: 'getting-started',
        description: 'Learn how to use the CMS to create and manage content.',
        published: true,
        author: editorUser._id,
        lastEditor: editorUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'Getting Started with CMS' },
          },
          {
            id: '2',
            type: 'paragraph',
            content: { text: 'This guide will walk you through the basic steps of using our CMS platform.' },
          },
          {
            id: '3',
            type: 'heading',
            level: 2,
            content: { text: 'Step 1: Create an Account' },
          },
          {
            id: '4',
            type: 'paragraph',
            content: { text: 'Sign up with your email address and create a strong password. You will receive an email confirmation.' },
          },
          {
            id: '5',
            type: 'heading',
            level: 2,
            content: { text: 'Step 2: Access the Admin Panel' },
          },
          {
            id: '6',
            type: 'paragraph',
            content: { text: 'Log in to access the admin dashboard where you can manage all pages and content.' },
          },
          {
            id: '7',
            type: 'heading',
            level: 2,
            content: { text: 'Step 3: Create Your First Page' },
          },
          {
            id: '8',
            type: 'list',
            content: {
              items: [
                'Click "New Page" in the dashboard',
                'Enter a title and slug (URL-friendly name)',
                'Add content blocks using the available types',
                'Save as draft or publish immediately',
              ],
            },
          },
        ],
        metadata: {
          tags: ['guide', 'tutorial', 'getting-started', 'help'],
          seo: {
            title: 'Getting Started Guide - CMS',
            description: 'Learn how to use our CMS platform step by step',
            keywords: ['guide', 'tutorial', 'getting-started', 'help'],
          },
        },
      },
      {
        title: 'The Beauty of Mathematics',
        slug: 'about-math',
        description: 'An exploration of mathematical concepts and theorems.',
        published: true,
        author: adminUser._id,
        lastEditor: adminUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'The Beauty of Mathematics' },
          },
          {
            id: '2',
            type: 'paragraph',
            content: {
              text: 'Mathematics is the language of the universe, used to describe patterns, relationships, and structures found in nature and science.',
            },
          },
          {
            id: '3',
            type: 'heading',
            level: 2,
            content: { text: 'The Pythagorean Theorem' },
          },
          {
            id: '4',
            type: 'paragraph',
            content: {
              text: 'One of the most famous theorems in mathematics states that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides:',
            },
          },
          {
            id: '5',
            type: 'equation',
            content: { latex: 'a^2 + b^2 = c^2' },
          },
          {
            id: '6',
            type: 'heading',
            level: 2,
            content: { text: 'The Golden Ratio' },
          },
          {
            id: '7',
            type: 'paragraph',
            content: {
              text: 'The golden ratio, often denoted by the Greek letter phi, appears frequently in nature and art:',
            },
          },
          {
            id: '8',
            type: 'equation',
            content: { latex: '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618' },
          },
          {
            id: '9',
            type: 'paragraph',
            content: {
              text: 'This ratio is believed to appear in many natural phenomena, from the spiral of galaxies to the proportions of the human body.',
            },
          },
        ],
        metadata: {
          tags: ['mathematics', 'science', 'education', 'theorems'],
          seo: {
            title: 'The Beauty of Mathematics - Mathematical Concepts',
            description: 'Explore fundamental mathematical concepts and theorems',
            keywords: ['mathematics', 'theorems', 'equations', 'science'],
          },
        },
      },
      {
        title: 'Product Features & Capabilities',
        slug: 'features',
        description: 'Overview of all product features and capabilities.',
        published: true,
        author: editorUser._id,
        lastEditor: editorUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'Product Features' },
          },
          {
            id: '2',
            type: 'paragraph',
            content: { text: 'Our CMS platform offers a comprehensive set of features for content creation and management.' },
          },
          {
            id: '3',
            type: 'heading',
            level: 2,
            content: { text: 'Core Capabilities' },
          },
          {
            id: '4',
            type: 'table',
            content: {
              headers: ['Feature', 'Description', 'Status'],
              rows: [
                ['Block Editor', 'Drag-and-drop content editor with multiple block types', 'Available'],
                ['Version History', 'Track all changes and revisions to pages', 'Available'],
                ['SEO Tools', 'Optimize pages for search engines with metadata', 'Available'],
                ['Role-Based Access', 'Control user permissions (admin, editor, viewer)', 'Available'],
                ['Collaborative Editing', 'Real-time collaboration with multiple editors', 'Coming Soon'],
                ['API Access', 'RESTful API for external integrations', 'Available'],
                ['Analytics', 'Track page views and user engagement', 'Coming Soon'],
                ['Media Management', 'Upload and manage images and files', 'Coming Soon'],
              ],
            },
          },
        ],
        metadata: {
          tags: ['features', 'product', 'capabilities', 'overview'],
          seo: {
            title: 'Product Features - CMS Platform',
            description: 'Learn about all available features in our CMS platform',
            keywords: ['features', 'product', 'capabilities', 'cms'],
          },
        },
      },
      {
        title: 'API Documentation',
        slug: 'api-docs',
        description: 'Complete documentation for the CMS REST API.',
        published: true,
        author: adminUser._id,
        lastEditor: adminUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'API Documentation' },
          },
          {
            id: '2',
            type: 'heading',
            level: 2,
            content: { text: 'Authentication Endpoints' },
          },
          {
            id: '3',
            type: 'list',
            content: {
              items: [
                'POST /api/auth/register - Register a new user',
                'POST /api/auth/login - Login and receive JWT token',
                'GET /api/auth/me - Get current user information (requires token)',
              ],
            },
          },
          {
            id: '4',
            type: 'heading',
            level: 2,
            content: { text: 'Pages Endpoints' },
          },
          {
            id: '5',
            type: 'list',
            content: {
              items: [
                'GET /api/pages - Get all pages (requires token)',
                'GET /api/pages/:id - Get a specific page (requires token)',
                'GET /api/pages/slug/:slug - Get published page by slug (public)',
                'POST /api/pages - Create a new page (requires token)',
                'PUT /api/pages/:id - Update a page (requires token)',
                'DELETE /api/pages/:id - Delete a page (requires token)',
              ],
            },
          },
          {
            id: '6',
            type: 'heading',
            level: 2,
            content: { text: 'Authentication' },
          },
          {
            id: '7',
            type: 'paragraph',
            content: {
              text: 'Include your JWT token in the Authorization header: Authorization: Bearer YOUR_TOKEN_HERE',
            },
          },
        ],
        metadata: {
          tags: ['api', 'documentation', 'technical', 'integration'],
          seo: {
            title: 'API Documentation - CMS',
            description: 'Complete REST API documentation for the CMS platform',
            keywords: ['api', 'documentation', 'rest', 'integration'],
          },
        },
      },
    ];

    const createdPages = await Page.insertMany(samplePages);
    console.log(`Created ${createdPages.length} sample pages`);

    console.log('\nSeeding completed successfully!');
    console.log('\nUser Credentials:');
    console.log('Admin:  admin@example.com / admin123');
    console.log('Editor: editor@example.com / editor123');
    console.log('Viewer: viewer@example.com / viewer123');
    console.log('\nSample Pages:');
    createdPages.forEach((page) => {
      console.log(`- ${page.title} (${page.slug})`);
    });
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seed();
  await mongoose.disconnect();
  console.log('\nDisconnected from MongoDB');
  process.exit(0);
};

run();
