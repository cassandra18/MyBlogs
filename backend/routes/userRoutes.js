const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authController');  // Protect middleware to ensure user is authenticated
const { userController } = require('../controllers/userController');  // Import user controller

// Route to create a new user (public route)
router.post('/register', userController.createUser);  // Register new user

// Route to log in a user (public route)
router.post('/login', userController.loginUser);  // Login user

// Route to get the current user's information (protected route)
router.get('/me', protect, userController.getMe);  // Get current user details, protected

// Route to delete a user by their ID (protected route)
router.delete('/:userId', protect, userController.deleteUser);  // Only an authenticated user or admin can delete a user

module.exports = router;
