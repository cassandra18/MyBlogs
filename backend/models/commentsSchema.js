const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema= new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps: true

});


const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;