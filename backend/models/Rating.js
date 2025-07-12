const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  swapRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest', required: true },
  ratingScore: { type: Number, min: 1, max: 5, required: true },
  feedbackText: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);
