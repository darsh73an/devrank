const mongoose = require('mongoose');
const { ROLES } = require('../config/roleConfig');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  targetRole: { type: String, enum: ROLES, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);