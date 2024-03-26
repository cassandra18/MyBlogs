const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = require('./commentsSchema');
const Likes = require('./likesSchema');

    
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
      //required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    authorName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String], //Array of tags for categorization
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ],
    ratings: [
        {
            user: Schema.Types.ObjectId,
            ref: 'User',
            type: Number,
            value: {
                default: 0,
                min: 0,
                max: 5
            }
           
        }
    ],
    comments: [{
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
    }]
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;