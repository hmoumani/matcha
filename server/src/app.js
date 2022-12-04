const express = require('express');

const app = express();

const cors = require('cors');

require('dotenv').config();

// error handler
require('express-async-errors');

const {  } = require('./middlewares/index.js');

// enable cors
app.use(cors());

// parse json body
app.use(express.json());

// load routes
require('./loaders/routes')(app);

// load and validate env variables
require('./loaders/config');

module.exports = app;
