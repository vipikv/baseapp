const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.post('/login', loginUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;