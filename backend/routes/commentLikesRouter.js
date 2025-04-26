const express = require('express');
const { likeComment, unlikeComment } = require('../controllers/commentLikeController');
const router = express.Router();

// Like a comment
router.post('/:commentId/like', likeComment);

// Unlike a comment
router.post('/:commentId/unlike', unlikeComment);

module.exports = router;
