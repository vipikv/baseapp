// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// storage for profile photos
const photoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile-photos',    // ← folder in cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 500, height: 500, crop: 'limit' }, // resize!
      { quality: 'auto' }                          // compress!
    ]
  }
});

// storage for resumes
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resumes',           // ← folder in cloudinary
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'raw'         // ← for documents!
  }
});

const uploadPhoto = multer({ 
  storage: photoStorage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

const uploadResume = multer({ 
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = { uploadPhoto, uploadResume };