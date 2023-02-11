import express from "express";

const router = express.Router();

import middlewares  from "../../middlewares";

// validator
import FeedValidator from "./feed.validator";

// service
import FeedService from "./feed.service";

// controller
import FeedController from "./feed.controller";
import setupFeedRoutes from "./feed.routes";


const {makeValidatorCallback, responseCallback} = middlewares;

// routes
export const FeedRoutes = setupFeedRoutes({
  router,
  FeedController,
  FeedValidator,
  makeValidatorCallback,
  responseCallback,
});

export default {
  FeedController,
  FeedService
};
