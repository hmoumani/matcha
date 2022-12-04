import { router } from "express";

import { makeExpressCallback } from "../../middlewares/index";

// validator
import AuthValidator from "./auth.validator";

// service
import AuthService from "./auth.service";

// controller
import AuthController from "./auth.controller";

// routes
const routes = require('./auth.routes')({
  router,
  AuthController,
  AuthValidator,
  makeExpressCallback
});

export default {
  AuthController,
  AuthService,
  AuthRoutes: routes
};
