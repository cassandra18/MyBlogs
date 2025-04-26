const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostSchema');
const Rating = require('../models/ratingSchema');

// Controller to add or update a rating for a post
const addRating = asyncHandler(async (req, res) => {
    const { userId } = req.user; 
    const { postId } = req.params;
    const { rating } = req.body;

    // Validate rating value
    if (rating < 1 || rating > 5) {
        res.status(400);
        throw new Error('Rating must be between 1 and 5');
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Check if the user already rated this post
    let userRating = await Rating.findOne({ user: userId, post: postId });

    if (userRating) {
        // Update the rating
        userRating.rating = rating;
        await userRating.save();
        res.status(200).json({ message: 'Rating updated successfully', rating: userRating });
    } else {
        // Create a new rating
        userRating = await Rating.create({ user: userId, post: postId, rating });
        res.status(201).json({ message: 'Rating added successfully', rating: userRating });
    }
});

module.exports = addRating;
