// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { uploadPhoto, uploadResume } = require('../middleware/upload');
const { uploadProfilePhoto, uploadResume: uploadResumeController, deletePhoto } = require('../controllers/uploadController');

router.use(authMiddleware); // all protected!

router.post('/photo', uploadPhoto.single('photo'), uploadProfilePhoto);
//                                    ↑ field name in form!
router.post('/resume', uploadResume.single('resume'), uploadResumeController);
router.delete('/photo', deletePhoto);

module.exports = router;