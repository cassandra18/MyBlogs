const express = require('express');
const addRating  = require('../controllers/ratingController');
const router = express.Router();

// Route to add or update rating
router.post('/posts/:postId/rate', addRating);

module.exports = router;
