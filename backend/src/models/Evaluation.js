const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateName: { type: String },
  targetRole: { type: String },
  detectedRole: { type: String },
  roleConfidence: { type: Number },
  
  profiles: {
    github: { type: Boolean, default: false },
    leetcode: { type: Boolean, default: false },
    codeforces: { type: Boolean, default: false },
    hackerrank: { type: Boolean, default: false },
    kaggle: { type: Boolean, default: false },
    hackthebox: { type: Boolean, default: false },
    tryhackme: { type: Boolean, default: false }
  },

  githubLanguages: Object,
  githubTopics: [String],
  githubStats: Object,
  resumeData: Object,
  projectData: Array,

  scores: {
    github: { type: Number, default: null },
    leetcode: { type: Number, default: null },
    codeforces: { type: Number, default: null },
    hackerrank: { type: Number, default: null },
    kaggle: { type: Number, default: null },
    hackthebox: { type: Number, default: null },
    tryhackme: { type: Number, default: null },
    papers: { type: Number, default: null },
    resume: { type: Number, default: null },
    projects: { type: Number, default: null }
  },

  rawScores: Object,
  adjustedWeights: Object,
  finalScore: { type: Number },
  level: { type: String }, // Beginner, Intermediate, Advanced
  scoreExplanation: { type: String },

  strengths: [String],
  weaknesses: [String],
  skillGaps: [String],
  feedback: { type: String },
  recommendations: [String],

  interviewReadiness: {
    fundamentals: { type: String },
    problemSolving: { type: String },
    systemDesign: { type: String },
    domainKnowledge: { type: String }
  },
  
  interviewReadinessScore: { type: Number },
  interviewTopics: [String],
  preparationRoadmap: Object // Structured roadmap data
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);