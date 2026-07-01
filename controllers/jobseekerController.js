// controllers/jobSeekerController.js
const JobSeeker = require('../models/jobseekerModel');

// create profile
exports.createProfile = async (req, res, next) => {
  try {
    if (req.user.role !== 'jobseeker') {
      return res.status(403).json({ message: 'Only jobseekers can create profile!' });
    }

    const existingProfile = await JobSeeker.findOne({ user: req.user.userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists!' });
    }

    const profile = await JobSeeker.create({
      ...req.body,
      user: req.user.userId, // ← from token!
    });

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// get own profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOne({ user: req.user.userId })
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

// get jobseeker by id — public!
exports.getJobSeekerById = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findById(req.params.id)
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'JobSeeker not found' });
    }

    // check profile visibility!
    if (profile.profileVisibility === 'private') {
      return res.status(403).json({ message: 'Profile is private!' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

// get all jobseekers — employers only!
exports.getAllJobSeekers = async (req, res, next) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can view all jobseekers!' });
    }

    const jobSeekers = await JobSeeker.find({
      status: 'active',
      profileVisibility: 'public'
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobSeekers.length,
      jobSeekers
    });
  } catch (error) {
    next(error);
  }
};

// update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// update resume
exports.updateResume = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { 
        resume: { 
          url: req.body.url,
          updatedAt: Date.now()
        } 
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Resume updated successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// add experience
exports.addExperience = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { $push: { experience: req.body } }, // ← push to array!
      { new: true }
    );

    res.status(200).json({
      message: 'Experience added successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// delete experience
exports.deleteExperience = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { $pull: { experience: { _id: req.params.expId } } }, // ← pull from array!
      { new: true }
    );

    res.status(200).json({
      message: 'Experience deleted successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// add education
exports.addEducation = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { $push: { education: req.body } },
      { new: true }
    );

    res.status(200).json({
      message: 'Education added successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// delete education
exports.deleteEducation = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { $pull: { education: { _id: req.params.eduId } } },
      { new: true }
    );

    res.status(200).json({
      message: 'Education deleted successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// add certification
exports.addCertification = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.userId },
      { $push: { certifications: req.body } },
      { new: true }
    );

    res.status(200).json({
      message: 'Certification added successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// delete profile
exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await JobSeeker.findOneAndDelete({ user: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    next(error);
  }
};