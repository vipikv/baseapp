// routes/employerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  createEmployerProfile,
  getMyProfile,
  getEmployerById,
  getAllEmployers,
  updateEmployerProfile,
  deleteEmployerProfile,
  updateLogo,
} = require('../controllers/employerController');

// ✅ public routes
router.get('/', getAllEmployers);          // GET /api/employers
router.get('/:id', getEmployerById);      // GET /api/employers/:id

// 🔒 protected routes
router.use(authMiddleware);

router.route('/profile')
  .get(getMyProfile)              // GET    /api/employers/profile
  .post(createEmployerProfile)    // POST   /api/employers/profile
  .put(updateEmployerProfile)     // PUT    /api/employers/profile
  .delete(deleteEmployerProfile); // DELETE /api/employers/profile

router.put('/profile/logo', updateLogo);  // PUT /api/employers/profile/logo

module.exports = router;