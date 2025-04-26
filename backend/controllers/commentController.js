const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostSchema');
const Comments = require('../models/commentsSchema'); // Import the Comments model

const createComment = asyncHandler(async (req, res) => {
    const { text } = req.body;  // Get comment text from request body
    const { postId } = req.params;  // Get postId from request parameters
    const { userId } = req.user;  // Get userId from authenticated user

    if (!text) {
        res.status(400);
        throw new Error("Comment text is required");
    }

    // Find the post where the comment will be added
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    // Create a new comment
    const newComment = new Comments({
        content: text,
        post: postId,
        user: userId,
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    // Populate the comment author with their username
    await post.populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' }
    });

    res.status(201).json(post.comments);  // Return all comments for the post
});

module.exports = { createComment };
