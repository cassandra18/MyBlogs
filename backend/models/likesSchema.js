const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  comment: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Comment'
},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, 
{
  timestamps: true
});

const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;
