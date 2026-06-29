// models/JobSeeker.js
const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // personal info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer not to say']
  },
  profilePhoto: { type: String }, // url
  about: { type: String },

  // location
  location: {
    address: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    pincode: { type: String },
  },

  // resume
  resume: {
    url: { type: String },       // uploaded file url
    updatedAt: { type: Date },
  },

  // skills
  skills: [{ 
    name: { type: String },
    level: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'expert'] 
    }
  }],

  // experience
  experience: [{
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    jobType: { 
      type: String, 
      enum: ['full-time', 'part-time', 'contract', 'internship'] 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String },
  }],

  // education
  education: [{
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    grade: { type: String },
    currentlyStudying: { type: Boolean, default: false },
  }],

  // certifications
  certifications: [{
    name: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issuedDate: { type: Date },
    expiryDate: { type: Date },
    credentialUrl: { type: String },
  }],

  // languages
  languages: [{
    name: { type: String },
    proficiency: { 
      type: String, 
      enum: ['basic', 'conversational', 'fluent', 'native'] 
    }
  }],

  // social media
  socialMedia: {
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    twitter: { type: String },
  },

  // job preferences
  jobPreferences: {
    jobType: [{
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
    }],
    expectedSalary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'USD' }
    },
    preferredLocations: [String],
    preferredIndustries: [String],
    noticePeriod: { 
      type: String,
      enum: ['immediately', '15 days', '1 month', '2 months', '3 months']
    },
    openToRemote: { type: Boolean, default: false },
  },

  // total experience
  totalExperience: { type: String },

  // profile status
  isAvailable: { type: Boolean, default: true },
  profileVisibility: { 
    type: String, 
    enum: ['public', 'private'],
    default: 'public'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },

}, { timestamps: true });

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);