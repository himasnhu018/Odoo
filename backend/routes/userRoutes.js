const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile, getPublicProfiles } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.get('/public', getPublicProfiles);

module.exports = router;
