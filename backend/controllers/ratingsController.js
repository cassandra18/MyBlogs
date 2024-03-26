const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostSchema');


const addRating = asyncHandler(async(req, res) => {
    const { userId } = req.user;
    const { postId } = req.params;
    const { rating } =req.body;

    //Update the corresponding posst with new rating
    const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { ratings: { user: userId, value: rating } } },
        {new: true }
    );

    res.status(201).json(post.ratings)
});

module.exports = addRating;