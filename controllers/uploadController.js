// controllers/uploadController.js
const cloudinary = require('../config/cloudinary');
const JobSeeker = require('../models/JobSeeker');
const Employer = require('../models/Employer');

// upload profile photo
exports.uploadProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const photoUrl = req.file.path; // ← cloudinary URL!

    // save to jobseeker or employer based on role
    if (req.user.role === 'jobseeker') {
      await JobSeeker.findOneAndUpdate(
        { user: req.user.userId },
        { profilePhoto: photoUrl },
        { new: true }
      );
    } else if (req.user.role === 'employer') {
      await Employer.findOneAndUpdate(
        { user: req.user.userId },
        { logo: photoUrl },
        { new: true }
      );
    }

    res.status(200).json({
      message: 'Photo uploaded successfully',
      url: photoUrl
    });
  } catch (error) {
    next(error);
  }
};

// upload resume
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const resumeUrl = req.file.path; // ← cloudinary URL!

    await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { 
        resume: { 
          url: resumeUrl,
          updatedAt: Date.now()
        } 
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Resume uploaded successfully',
      url: resumeUrl
    });
  } catch (error) {
    next(error);
  }
};

// delete photo from cloudinary
exports.deletePhoto = async (req, res, next) => {
  try {
    const { publicId } = req.body;
    
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    next(error);
  }
};