const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareTrackerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  platform: {
    type: String,
    enum: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy-link', 'other'],
    default: 'other',
  },
}, { timestamps: true });

const ShareTracker = mongoose.model('ShareTracker', shareTrackerSchema);

module.exports = ShareTracker;
