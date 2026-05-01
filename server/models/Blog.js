const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: String,
  tags: [String],
  coverImage: String,
  published: { type: Boolean, default: false },
  readTime: Number,
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
