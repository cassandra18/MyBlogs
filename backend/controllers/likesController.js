const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostSchema');


const addLike = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { postId } = req.params;

    //Update the corresponding post with the new like
    const post = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } }, //Using $addToSet to ensure uniqueness
        { new: true }
    );

    res.status(201).json(post.likes);
});

module.exports = addLike;