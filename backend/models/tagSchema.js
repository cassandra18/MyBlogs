const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
