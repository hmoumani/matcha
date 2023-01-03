import express from 'express';

const app = express();

import cors from 'cors';

import dotenv from 'dotenv'

import cookieSession from "cookie-session";

dotenv.config();

// error handler
import 'express-async-errors';

app.use(
    cookieSession({
        name: "matcha-session",
        secret: process.env.COOKIE_SECRET || 'wanna know my secret?',
        httpOnly: true,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

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
app.use(cors({
    origin: ['*']
}));

// parse json body  
app.use(express.json());

// load routes
import setupRoutes from './loaders/routes';

setupRoutes(app);

export default app;
