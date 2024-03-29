const express = require('express');
require('colors');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const cors = require('cors');


//connect to database
connectDB();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
//Middleware to parse incoming JSON requests used in API handle JSON  payloads.
app.use(express.json());

//Middleware to log the request body
app.use((req, res, next) => {
    console.log('Request body: ', req.body);
    next();
});

//post routes
app.use('/api/post', require('./routes/postRoutes'),
    require('./routes/commentRoutes'),
    require('./routes/likesRoutes'),
    require('./routes/ratingsRoutes'));

//admin routes
app.use('/api/admin', require('./routes/adminRoutes'));

//user routes
app.use('/api/user', require('./routes/userRoutes'));

//search routes
app.use('/api', require('./routes/searchRoutes'));

// subscription email route
app.use('/api', require('./routes/emailRoutes'));

//contact form route
app.use('/api', require('./routes/contactRoutes'));
app.use(errorHandler);

// Backend start link
app.get('/', (req, res) => {

    res.send('Welcome to My Blog App Backend side');

});

app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
