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


app.use('/api/post', require('./routes/postRoutes'),
    require('./routes/commentRoutes'),
    require('./routes/likesRoutes'),
    require('./routes/ratingsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/searchRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`.blue));
