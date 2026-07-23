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
    // Clear existing data
    await User.deleteMany({});
    await Page.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    });
    console.log('Created admin user:', adminUser.email);

    // Create editor user
    const editorUser = await User.create({
      email: 'editor@example.com',
      password: 'editor123',
      name: 'Editor User',
      role: 'editor',
    });
    console.log('Created editor user:', editorUser.email);

    // Create sample pages
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
            content: { text: 'Features' },
          },
          {
            id: '4',
            type: 'list',
            content: {
              items: [
                'Block-based editor',
                'Multiple content types',
                'Role-based access control',
                'Version history',
                'SEO optimization',
              ],
            },
          },
        ],
        metadata: {
          tags: ['welcome', 'cms', 'introduction'],
          seo: {
            title: 'Welcome to Our CMS - Content Management System',
            description: 'A powerful and flexible CMS platform',
            keywords: ['cms', 'content', 'management'],
          },
        },
      },
      {
        title: 'Getting Started Guide',
        slug: 'getting-started',
        description: 'Learn how to use the CMS.',
        published: true,
        author: editorUser._id,
        lastEditor: editorUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'Getting Started' },
          },
          {
            id: '2',
            type: 'paragraph',
            content: { text: 'Here are the basic steps to get started with our CMS.' },
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
            content: { text: 'Sign up with your email address and create a strong password.' },
          },
          {
            id: '5',
            type: 'heading',
            level: 2,
            content: { text: 'Step 2: Create a Page' },
          },
          {
            id: '6',
            type: 'paragraph',
            content: { text: 'Click on "New Page" and start adding content blocks.' },
          },
        ],
        metadata: {
          tags: ['guide', 'tutorial', 'getting-started'],
          seo: {
            title: 'Getting Started - CMS Guide',
            description: 'Learn how to use our CMS platform',
            keywords: ['guide', 'tutorial', 'getting-started'],
          },
        },
      },
      {
        title: 'About Mathematics',
        slug: 'about-math',
        description: 'An article about mathematics.',
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
              text: 'Mathematics is the language of the universe, used to describe patterns, relationships, and structures.',
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
            type: 'equation',
            content: { latex: 'a^2 + b^2 = c^2' },
          },
          {
            id: '5',
            type: 'paragraph',
            content: {
              text: 'One of the most famous theorems in mathematics, relating the sides of a right triangle.',
            },
          },
          {
            id: '6',
            type: 'heading',
            level: 2,
            content: { text: 'The Golden Ratio' },
          },
          {
            id: '7',
            type: 'equation',
            content: { latex: '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618' },
          },
        ],
        metadata: {
          tags: ['mathematics', 'science', 'education'],
          seo: {
            title: 'The Beauty of Mathematics',
            description: 'Explore mathematical concepts and theorems',
            keywords: ['mathematics', 'theorems', 'equations'],
          },
        },
      },
      {
        title: 'Product Features',
        slug: 'features',
        description: 'Overview of our product features.',
        published: true,
        author: editorUser._id,
        lastEditor: editorUser._id,
        blocks: [
          {
            id: '1',
            type: 'heading',
            level: 1,
            content: { text: 'Our Features' },
          },
          {
            id: '2',
            type: 'heading',
            level: 2,
            content: { text: 'Core Capabilities' },
          },
          {
            id: '3',
            type: 'table',
            content: {
              headers: ['Feature', 'Description', 'Status'],
              rows: [
                ['Block Editor', 'Drag-and-drop content editor', 'Available'],
                ['Version History', 'Track all changes', 'Available'],
                ['SEO Tools', 'Optimize for search engines', 'Available'],
                ['API Access', 'RESTful API for integration', 'Coming Soon'],
              ],
            },
          },
        ],
        metadata: {
          tags: ['features', 'product', 'capabilities'],
          seo: {
            title: 'Product Features - CMS',
            description: 'Learn about our CMS features',
            keywords: ['features', 'product', 'capabilities'],
          },
        },
      },
    ];

    const createdPages = await Page.insertMany(samplePages);
    console.log(`Created ${createdPages.length} sample pages`);

    console.log('\nSeeding completed successfully!');
    console.log('\nDefault credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Editor: editor@example.com / editor123');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seed();
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit(0);
};

run();
