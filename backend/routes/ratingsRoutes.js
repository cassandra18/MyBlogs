const express = require('express');
const router = express.Router();
const { authenticateToken }  = require('../middleware/authUserMiddleware');
const addRating = require('../controllers/ratingsController');

router.route('/:postId/rate').post(authenticateToken, addRating);

module.exports = router;