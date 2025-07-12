const User = require('../models/User');

// @desc    Get own profile
exports.getMyProfile = async (req, res) => {
  res.json(req.user);
};

// @desc    Update own profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all public profiles (with optional skill search)
exports.getPublicProfiles = async (req, res) => {
  const { skill } = req.query;

  const query = {
    isPublic: true
  };

  if (skill) {
    query.$or = [
      { skillsOffered: { $regex: skill, $options: 'i' } },
      { skillsWanted: { $regex: skill, $options: 'i' } }
    ];
  }

  const users = await User.find(query).select('-password');
  res.json(users);
};
