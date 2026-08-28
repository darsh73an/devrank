const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  github: { type: String, default: null },
  leetcode: { type: String, default: null },
  codeforces: { type: String, default: null },
  hackerrank: { type: String, default: null },
  kaggle: { type: String, default: null },
  hackthebox: { type: String, default: null },
  tryhackme: { type: String, default: null },
  resumeUrl: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);