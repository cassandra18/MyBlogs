const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'rating', 'reply', 'follow'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  relatedPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  relatedComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;