const SwapRequest = require('../models/SwapRequest');

// @desc Send a swap request
exports.sendRequest = async (req, res) => {
  const { toUser, offeredSkill, wantedSkill, message } = req.body;

  try {
    const swap = await SwapRequest.create({
      fromUser: req.user._id,
      toUser,
      offeredSkill,
      wantedSkill,
      message
    });

    res.status(201).json(swap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Accept a swap
exports.acceptRequest = async (req, res) => {
  const request = await SwapRequest.findById(req.params.id);

  if (!request || request.toUser.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  request.status = 'accepted';
  await request.save();

  res.json({ message: 'Swap accepted' });
};

// @desc Reject a swap
exports.rejectRequest = async (req, res) => {
  const request = await SwapRequest.findById(req.params.id);

  if (!request || request.toUser.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  request.status = 'rejected';
  await request.save();

  res.json({ message: 'Swap rejected' });
};

// @desc Delete a swap (if still pending)
exports.deleteRequest = async (req, res) => {
  const request = await SwapRequest.findById(req.params.id);

  if (!request || request.fromUser.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  if (request.status !== 'pending') {
    return res.status(400).json({ message: 'Only pending requests can be deleted' });
  }

  request.status = 'deleted';
  await request.save();

  res.json({ message: 'Swap request deleted' });
};

// @desc Get all my swaps
exports.getMySwaps = async (req, res) => {
  const sent = await SwapRequest.find({ fromUser: req.user._id }).populate('toUser', 'name email');
  const received = await SwapRequest.find({ toUser: req.user._id }).populate('fromUser', 'name email');

  res.json({ sent, received });
};
