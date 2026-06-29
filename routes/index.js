const express = require('express');
const userRoutes = require('./userRoutes');
const employerRoutes = require('./employerRoutes');
const jobseekerRoutes = require('./jobseekerRoutes');
const jobpostsRoutes = require('./jobpostsRoutes');
const uploadRoutes = require('./uploadRoutes');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/employers', employerRoutes);
router.use('/jobseekers', jobseekerRoutes);
router.use('/jobs', jobpostsRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;