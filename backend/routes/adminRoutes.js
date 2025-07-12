const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');
const {
  toggleBanUser,
  getAllSwaps,
  getAllFeedback,
  sendAnnouncement,
  downloadReport
} = require('../controllers/adminController');

router.use(protect, isAdmin); // all admin routes require admin role

router.post('/ban/:userId', toggleBanUser);
router.get('/swaps', getAllSwaps);
router.get('/feedback', getAllFeedback);
router.post('/announce', sendAnnouncement);
router.get('/report/:type', downloadReport);

module.exports = router;
