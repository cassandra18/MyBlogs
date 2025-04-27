const express = require('express');
require('colors');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const cors = require('cors');

// Connect to the database
connectDB();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Middleware to log the request body
app.use((req, res, next) => {
    console.log('Request body: ', req.body);
    next();
});

// Post-related routes
app.use('/api/post', require('./routes/postRoutes'));
app.use('/api/comment', require('./routes/commentRoutes'));
app.use('/api/likes', require('./routes/commentLikesRouter.js'));
app.use('/api/ratings', require('./routes/ratingsRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/', require('./routes/tagRoutes'));


// User-related routes
app.use('/api/user', require('./routes/userRoutes'));

// Subscription email route
app.use('/api/email', require('./routes/emailRoutes'));

// Contact form route
app.use('/api/contact', require('./routes/contactRoutes'));

app.use('/uploads', express.static('uploads'));

// Error handler middleware
app.use(errorHandler);

// Welcome message route (for the backend)
app.get('/', (req, res) => {
    res.send('Welcome to My Blog App Backend!');
});

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
