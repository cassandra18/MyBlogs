const asyncHandler = require('express-async-handler');
const ShareTracker = require('../models/shareTrackerSchema');
const Post = require('../models/blogPostSchema'); // To verify post existence

// Track a post share
const trackShare = asyncHandler(async (req, res) => {
    const { postId, platform } = req.body;
    const { userId } = req.user;  // Assuming the user is authenticated

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    // Check if the user has already shared the post on the same platform
    const existingShare = await ShareTracker.findOne({ user: userId, post: postId, platform });

    if (existingShare) {
        res.status(400);
        throw new Error("You have already shared this post on this platform");
    }

    // Create a new share record
    const newShare = await ShareTracker.create({
        user: userId,
        post: postId,
        platform
    });

    res.status(201).json(newShare);
});

// Get all shares for a specific post
const getSharesByPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    // Get all shares for this post
    const shares = await ShareTracker.find({ post: postId })
        .populate('user', 'username')  // Populate user details
        .populate('post', 'title');    // Populate post details

    if (shares) {
        res.status(200).json(shares);
    } else {
        res.status(404);
        throw new Error("No shares found for this post");
    }
});

// Get all shares by a specific user
const getSharesByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Get all shares by this user
    const shares = await ShareTracker.find({ user: userId })
        .populate('post', 'title')  // Populate post details
        .populate('user', 'username');  // Populate user details

    if (shares) {
        res.status(200).json(shares);
    } else {
        res.status(404);
        throw new Error("No shares found for this user");
    }
});

// Delete a share record
const deleteShare = asyncHandler(async (req, res) => {
    const { shareId } = req.params;

    // Find and delete the share record
    const share = await ShareTracker.findByIdAndDelete(shareId);

    if (share) {
        res.status(200).json({ message: 'Share record deleted successfully' });
    } else {
        res.status(404);
        throw new Error("Share record not found");
    }
});

module.exports = {
    trackShare,
    getSharesByPost,
    getSharesByUser,
    deleteShare
};
