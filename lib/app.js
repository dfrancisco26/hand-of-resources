const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes
app.use('/newgames', require('./controllers/newgames'));
app.use('/retrogames', require('./controllers/retrogames'));
app.use('/apples', require('./controllers/apples'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
