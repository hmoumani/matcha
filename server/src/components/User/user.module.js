import express from "express";

const router = express.Router();

import middlewares  from "../../middlewares";

// validator
import AuthValidator from "./auth.validator";

// service
import AuthService from "./auth.service";

// controller
import AuthController from "./auth.controller";
import setupAuthRoutes from "./auth.routes";


const {makeValidatorCallback, responseCallback} = middlewares;

// routes
export const AuthRoutes = setupAuthRoutes({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  responseCallback,
});

export default {
  AuthController,
  AuthService
};
