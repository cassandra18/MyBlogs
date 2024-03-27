const express = require('express');
const router = express.Router();
const { authenticateUserToken }  = require('../middleware/authUserMiddleware');
const addRating = require('../controllers/ratingsController');

router.route('/:postId/rate').post(authenticateUserToken, addRating);

module.exports = router;