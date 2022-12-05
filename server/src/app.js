import express from 'express';

const app = express();

import cors from 'cors';

// error handler
import 'express-async-errors';

// enable cors
app.use(cors());

// parse json body
app.use(express.json());

// load routes
import setupRoutes from './loaders/routes';

setupRoutes(app);

export default app;
