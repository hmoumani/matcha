const router = require('express').Router();

const { makeExpressCallback } = require('../../middlewares');

// validator
const AuthValidator = require('./auth.validator');

// service
const AuthService = require('./auth.service');

// controller
const AuthController = require('./auth.controller');

// routes
const routes = require('./auth.routes')({
  router,
  AuthController,
  AuthValidator,
  makeExpressCallback
});

module.exports = {
  AuthController,
  AuthService,
  AuthRoutes: routes
};
