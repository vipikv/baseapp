// models/JobPost.js
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  employer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  jobType: { 
    type: String, 
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time'
  },
  skills: [String],
  experience: { type: String },
  deadline: { type: Date },
  status: { 
    type: String, 
    enum: ['open', 'closed'],
    default: 'open'
  },
}, { timestamps: true });

module.exports = mongoose.model('JobPost', jobPostSchema);