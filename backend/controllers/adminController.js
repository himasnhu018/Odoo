const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');
const Rating = require('../models/Rating');
const { Parser } = require('json2csv');

// @desc Ban or unban user
exports.toggleBanUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = user.role === 'banned' ? 'user' : 'banned';
  await user.save();

  res.json({ message: `User ${user.role === 'banned' ? 'banned' : 'unbanned'}` });
};

// @desc Get all swap requests
exports.getAllSwaps = async (req, res) => {
  const swaps = await SwapRequest.find()
    .populate('fromUser toUser', 'name email')
    .sort({ createdAt: -1 });

  res.json(swaps);
};

// @desc Get all feedback logs
exports.getAllFeedback = async (req, res) => {
  const feedbacks = await Rating.find()
    .populate('fromUser toUser', 'name')
    .sort({ createdAt: -1 });

  res.json(feedbacks);
};

// @desc Broadcast a platform message (simulate)
exports.sendAnnouncement = async (req, res) => {
  const { message } = req.body;
  console.log('Broadcast message:', message); // In production: push notification/email service
  res.json({ message: 'Announcement sent' });
};

// @desc Download CSV reports
exports.downloadReport = async (req, res) => {
  const { type } = req.params;

  let data = [];
  if (type === 'swaps') {
    data = await SwapRequest.find().populate('fromUser toUser', 'name email');
  } else if (type === 'feedback') {
    data = await Rating.find().populate('fromUser toUser', 'name');
  } else if (type === 'users') {
    data = await User.find({}, '-password');
  } else {
    return res.status(400).json({ message: 'Invalid report type' });
  }

  const json2csv = new Parser();
  const csv = json2csv.parse(data);

  res.header('Content-Type', 'text/csv');
  res.attachment(`${type}-report.csv`);
  res.send(csv);
};
