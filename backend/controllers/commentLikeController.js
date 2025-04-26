const asyncHandler = require('express-async-handler');
const Likes = require('../models/likesSchema');
const Comments = require('../models/commentsSchema'); // Import Comments model

// Controller to like a comment
const likeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user;

    // Check if the comment exists
    const comment = await Comments.findById(commentId);
    if (!comment) {
        res.status(404);
        throw new Error("Comment not found");
    }

    // Check if the like already exists
    const existingLike = await Likes.findOne({ comment: commentId, user: userId });
    if (existingLike) {
        res.status(400);
        throw new Error("You have already liked this comment");
    }

    // Create a new like
    await Likes.create({ comment: commentId, user: userId, post: comment.post });

    res.status(201).json({ message: "Comment liked successfully" });
});

// Controller to unlike a comment
const unlikeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user;

    // Check if the comment exists
    const comment = await Comments.findById(commentId);
    if (!comment) {
        res.status(404);
        throw new Error("Comment not found");
    }

    // Find and delete the like
    const like = await Likes.findOneAndDelete({ comment: commentId, user: userId });
    if (!like) {
        res.status(400);
        throw new Error("You have not liked this comment yet");
    }

    res.status(200).json({ message: "Comment unliked successfully" });
});

module.exports = { likeComment, unlikeComment };
