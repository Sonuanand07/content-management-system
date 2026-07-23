import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ['heading', 'paragraph', 'list', 'table', 'equation', 'image'],
    required: true,
  },
  content: mongoose.Schema.Types.Mixed,
  level: Number, // For headings: 1-6, For lists: nesting level
});

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    blocks: [blockSchema],
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      tags: [String],
      seo: {
        title: String,
        description: String,
        keywords: [String],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Page', pageSchema);
