const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  getMySwaps
} = require('../controllers/swapController');

router.post('/request', protect, sendRequest);
router.put('/:id/accept', protect, acceptRequest);
router.put('/:id/reject', protect, rejectRequest);
router.delete('/:id', protect, deleteRequest);
router.get('/me', protect, getMySwaps);

module.exports = router;
