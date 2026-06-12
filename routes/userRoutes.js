const express = require('express');
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

router.route('/').get(getUsers).post(createUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;