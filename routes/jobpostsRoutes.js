// routes/jobPostRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
  getMyJobPosts,
} = require('../controllers/jobpostsController');

// ✅ public routes
router.route('/')
  .get(getAllJobPosts);          

router.route('/:id')
  .get(getJobPostById);    

// 🔒 protected routes
router.use(authMiddleware);

router.post('/', createJobPost);          // POST   /api/jobs
router.get('/employer/my-jobs', getMyJobPosts); // GET /api/jobs/employer/my-jobs

router.route('/:id')
  .put(updateJobPost)           // PUT    /api/jobs/:id
  .delete(deleteJobPost);       // DELETE /api/jobs/:id

module.exports = router;