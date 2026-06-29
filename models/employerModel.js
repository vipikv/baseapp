// models/Employer.js
const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // company basic info
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  website: { type: String },
  logo: { type: String }, // url

  // company details
  industry: {
    type: String,
    enum: [
      'technology',
      'healthcare',
      'finance',
      'education',
      'retail',
      'manufacturing',
      'construction',
      'hospitality',
      'media',
      'transportation',
      'other'
    ],
    required: true
  },
  companyType: {
    type: String,
    enum: [
      'startup',
      'small business',
      'mid-size',
      'large enterprise',
      'multinational',
      'government',
      'non-profit'
    ],
    required: true
  },
  companySize: {
    type: String,
    enum: [
      '1-10',
      '11-50',
      '51-200',
      '201-500',
      '501-1000',
      '1000+'
    ],
    required: true
  },
  foundedYear: { type: Number },
  about: { type: String, required: true },

  // location
  location: {
    address: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    pincode: { type: String },
  },

  // social media
  socialMedia: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },

  // job posting details
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  jobTypes: [{
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
  }],
  benefits: [{
    type: String,
    enum: [
        'health insurance',
        'provident fund',
        'paid time off',
        'remote work',
        'flexible hours',
        'annual bonus',
        'stock options',
        'travel allowance',
        'food allowance',
        'gym membership',
        'laptop provided',
        'education assistance',
        'cab facility',
        'maternity leave',
        'paternity leave',
    ]
    }],

  // verification
  isVerified: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },

}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);