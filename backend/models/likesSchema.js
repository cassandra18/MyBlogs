const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema= new Schema({
    _id: {
        type: Schema.Types.ObjectId
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


const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;