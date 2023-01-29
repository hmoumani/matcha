import express from 'express';

const router = express.Router();

import middlewares from '../../middlewares';


// validator
import UserValidator from './user.validator';

// service
import AuthService from './user.service';

// controller
import UserController from './user.controller';
import setupAuthRoutes from './user.routes';

const { makeValidatorCallback, responseCallback } = middlewares;

// routes
export const UserRoutes = setupAuthRoutes({
  router,
  UserController,
  UserValidator,
  makeValidatorCallback,
  responseCallback
});

export default {
  UserController,
  AuthService,
  UserRoutes
};
