// controllers/employerController.js
const Employer = require('../models/employerModel');

// create employer profile
exports.createEmployerProfile = async (req, res, next) => {
  try {
    // check role
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can create company profile!' });
    }

    // check if profile already exists
    const existingProfile = await Employer.findOne({ user: req.user.userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Employer profile already exists!' });
    }

    const profile = await Employer.create({
      ...req.body,
      user: req.user.userId, // ← from token!
    });

    res.status(201).json({
      message: 'Employer profile created successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};

// get own profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await Employer.findOne({ user: req.user.userId })
      .populate('user', 'name email'); // ← get user details!

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

// get employer profile by id — public!
exports.getEmployerById = async (req, res, next) => {
  try {
    const profile = await Employer.findById(req.params.id)
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

// get all employers — public!
exports.getAllEmployers = async (req, res, next) => {
  try {
    const employers = await Employer.find({ status: 'active' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: employers.length,
      employers
    });
  } catch (error) {
    next(error);
  }
};

// update employer profile
exports.updateEmployerProfile = async (req, res, next) => {
  try {
    const profile = await Employer.findOneAndUpdate(
      { user: req.user.userId }, // ← find by userId from token!
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

// delete employer profile
exports.deleteEmployerProfile = async (req, res, next) => {
  try {
    const profile = await Employer.findOneAndDelete({ user: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// update company logo
exports.updateLogo = async (req, res, next) => {
  try {
    const profile = await Employer.findOneAndUpdate(
      { user: req.user.userId },
      { logo: req.body.logo },
      { new: true }
    );

    res.status(200).json({
      message: 'Logo updated successfully',
      profile
    });
  } catch (error) {
    next(error);
  }
};