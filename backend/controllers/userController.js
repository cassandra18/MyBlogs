const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { 
        expiresIn: '30d', // token expires in 30 days
    });
};


const userController =  {

    // Create a new user
    createUser: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400);
            throw new Error('All fields are required!');
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser.id), // assuming generateToken is set up correctly
            });
        } else {
            res.status(400);
            throw new Error('Invalid data');
        }
    }),

    // Log in a user
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid credentials');
        }
    }),

    // Delete a user by ID
    deleteUser: asyncHandler(async (req, res) => {
        const userId = req.params.userId;

        const user = await User.findByIdAndDelete(userId);

        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),

    // Get the current user info
    getMe: asyncHandler(async (req, res) => {
        res.status(200).json(req.user);
    }),

};

module.exports = { userController, generateToken };
