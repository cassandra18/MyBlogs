const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imagePaths: {
    type: [{ type: String }],
    // optional image
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',  // connect to Category Schema
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  ratings: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    }
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
