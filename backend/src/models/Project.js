const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: null },
  liveUrl: { type: String, default: null },
  role: { type: String }, // User's role in the project
  features: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);