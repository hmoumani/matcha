import express from 'express';

const app = express();

import cors from 'cors';

// require('dotenv').config(); TODO

// error handler
import 'express-async-errors';

import {} from './middlewares/index.js';

// enable cors
app.use(cors());

// parse json body
app.use(express.json());

// load routes TODO
import setupRoutes from './loaders/routes.js';

setupRoutes(app);

// load and validate env variables TODO
// require('./loaders/config');
import './loaders/config.js';

export default app;
