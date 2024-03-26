const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema= new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;