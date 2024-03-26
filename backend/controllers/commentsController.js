const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostSchema');


const createComment = asyncHandler(async(req, res) => {
    const { text } = req.body;
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: {author: userId, text}} },
        { new: true }
    ).populate('comments.author', 'username');


    res.status(201).json(post.comments);
});


module.exports = createComment;