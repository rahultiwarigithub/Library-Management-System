const mongoSanitize = require('express-mongo-sanitize');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// bypass cross-origin requests 
app.use(cors());
// helps you secure app by setting various HTTP headers
app.use(helmet());
// parse the incoming requests with JSON payloads
app.use(express.json());
// sanitize mongodb queries eg - strip out keys starting with $
app.use(mongoSanitize());


// enpdoint just for testing purpose
app.get('/v1/library', (req, res) => {
    res.send("<h1>Library Management App<h1>");
})


// routing to major routes
app.use('/v1/library/admin', require('./routes/adminRoutes'));
app.use('/v1/library/users', require('./routes/userRoutes'));
app.use('/v1/library/books', require('./routes/bookRoutes'));
app.use(require('./middlewares/errorHandler'));

module.exports = app;

