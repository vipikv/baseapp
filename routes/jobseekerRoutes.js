// routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  createProfile,
  getMyProfile,
  getJobSeekerById,
  getAllJobSeekers,
  updateProfile,
  updateResume,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  addCertification,
  deleteProfile,
} = require('../controllers/jobSeekerController');

// ✅ public routes
router.get('/:id', getJobSeekerById);   // GET /api/jobseekers/:id

// 🔒 protected routes
router.use(authMiddleware);

router.get('/', getAllJobSeekers);       // GET    /api/jobseekers (employers only!)

router.route('/profile')
  .get(getMyProfile)                    // GET    /api/jobseekers/profile
  .post(createProfile)                  // POST   /api/jobseekers/profile
  .put(updateProfile)                   // PUT    /api/jobseekers/profile
  .delete(deleteProfile);               // DELETE /api/jobseekers/profile

// resume
router.put('/profile/resume', updateResume); // PUT /api/jobseekers/profile/resume

// experience
router.post('/profile/experience', addExperience);           // POST   /api/jobseekers/profile/experience
router.delete('/profile/experience/:expId', deleteExperience);// DELETE /api/jobseekers/profile/experience/:expId

// education
router.post('/profile/education', addEducation);             // POST   /api/jobseekers/profile/education
router.delete('/profile/education/:eduId', deleteEducation); // DELETE /api/jobseekers/profile/education/:eduId

// certification
router.post('/profile/certification', addCertification);     // POST   /api/jobseekers/profile/certification

module.exports = router;