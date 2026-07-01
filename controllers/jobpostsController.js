
const JobPost = require('../models/jobpostsModel');

// create job post — employer only!
exports.createJobPost = async (req, res, next) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs!' });
    }

    const jobPost = await JobPost.create({
      ...req.body,
      employer: req.user.userId, // ← from token!
    });

    res.status(201).json({ message: 'Job posted successfully', jobPost });
  } catch (error) {
    next(error);
  }
};

// get all job posts — public!
exports.getAllJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await JobPost.find({ status: 'open' })
      .populate('employer', 'name email') // ← get employer details!
      .sort({ createdAt: -1 });

    res.status(200).json({ count: jobPosts.length, jobPosts });
  } catch (error) {
    next(error);
  }
};

// get single job post — public!
exports.getJobPostById = async (req, res, next) => {
  try {
    const jobPost = await JobPost.findById(req.params.id)
      .populate('employer', 'name email');

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    res.status(200).json({ jobPost });
  } catch (error) {
    next(error);
  }
};

// update job post — employer only!
exports.updateJobPost = async (req, res, next) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // only owner can update!
    if (jobPost.employer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized!' });
    }

    const updatedJobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Job post updated', updatedJobPost });
  } catch (error) {
    next(error);
  }
};

// delete job post — employer only!
exports.deleteJobPost = async (req, res, next) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // only owner can delete!
    if (jobPost.employer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized!' });
    }

    await JobPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// get employer's own job posts!
exports.getMyJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await JobPost.find({ employer: req.user.userId });
    res.status(200).json({ count: jobPosts.length, jobPosts });
  } catch (error) {
    next(error);
  }
};