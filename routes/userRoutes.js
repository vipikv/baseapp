const express = require('express');
const authMiddleware = require("../middleware/auth");

const {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/').post(createUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.use(authMiddleware); // Apply auth middleware to all routes below
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;