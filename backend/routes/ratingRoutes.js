const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { submitFeedback, getUserRatings } = require('../controllers/ratingController');

router.post('/:swapId', protect, submitFeedback);
router.get('/user/:userId', getUserRatings);

module.exports = router;
