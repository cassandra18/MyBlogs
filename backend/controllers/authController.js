const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');  // Import the User model

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the required fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Generate JWT token for the user
    const token = generateToken(user._id);

    if (user) {
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both email and password');
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Generate JWT token for the user
    const token = generateToken(user._id);

    res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token,
    });
});

// Get logged-in user's profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
    });
});

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from token to request
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    protect,
};
