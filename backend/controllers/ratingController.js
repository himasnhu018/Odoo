const Rating = require('../models/Rating');
const SwapRequest = require('../models/SwapRequest');

// @desc Submit feedback after swap
exports.submitFeedback = async (req, res) => {
  const { ratingScore, feedbackText } = req.body;
  const swapId = req.params.swapId;

  try {
    const swap = await SwapRequest.findById(swapId);

    if (!swap || swap.status !== 'accepted') {
      return res.status(400).json({ message: 'Invalid or unaccepted swap' });
    }

    const toUser = swap.fromUser.equals(req.user._id) ? swap.toUser : swap.fromUser;

    // Prevent duplicate feedback
    const exists = await Rating.findOne({
      fromUser: req.user._id,
      toUser,
      swapRequest: swapId
    });

    if (exists) {
      return res.status(400).json({ message: 'Feedback already submitted' });
    }

    const feedback = await Rating.create({
      fromUser: req.user._id,
      toUser,
      swapRequest: swapId,
      ratingScore,
      feedbackText
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all ratings for a user
exports.getUserRatings = async (req, res) => {
  const ratings = await Rating.find({ toUser: req.params.userId })
    .populate('fromUser', 'name')
    .sort({ createdAt: -1 });

  res.json(ratings);
};
