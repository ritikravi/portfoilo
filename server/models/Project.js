const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: String,
  description: String,
  problem: String,
  solution: String,
  impact: String,
  category: { type: String, enum: ['AI', 'Web', 'IoT', 'Robotics'], required: true },
  tags: [String],
  techStack: [String],
  image: String,
  github: String,
  demo: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
