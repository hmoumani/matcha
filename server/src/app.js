import express from 'express';

const app = express();

import cors from 'cors';

import dotenv from 'dotenv';

import cookieSession from 'cookie-session';

// setup user gateway
// setupUserSocket(app);
// const io = require('socket.io')(http);

dotenv.config();

app.use('/public', express.static('static_files/'));

// error handler
import 'express-async-errors';

// Middleware to catch all errors
app.use(function (err, req, res, next) {
  // console.error(err.stack);
  res.status(HttpStatusCode.BAD_REQUEST).send('Something broke!');
});

app.use(
  cookieSession({
    name: 'matcha-session',
    secret: process.env.COOKIE_SECRET || 'wanna know my secret?',
    httpOnly: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8889');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// enable cors
app.use(
  cors({
    origin: ['*']
  })
);

// parse json body
app.use(express.json());

import engines from 'consolidate';
app.set('views', process.cwd() + '/src/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// load routes
import setupRoutes from './loaders/routes';
import HttpStatusCode from './enums/HttpStatusCode';

setupRoutes(app);

export default app;
