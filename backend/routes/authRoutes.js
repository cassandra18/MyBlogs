const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, protect } = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login an existing user
router.post('/login', loginUser);

// Get the current user's profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
