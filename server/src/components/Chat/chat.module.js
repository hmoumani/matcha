import express from "express";

const router = express.Router();

import middlewares  from "../../middlewares";

// validator
import ChatValidator from "./chat.validator";

// service
import ChatService from "./chat.service";

// controller
import ChatController from "./chat.controller";
import setupChatRoutes from "./chat.routes";


const {makeValidatorCallback, responseCallback} = middlewares;

// routes
export const ChatRoutes = setupChatRoutes({
  router,
  ChatController,
  ChatValidator,
  makeValidatorCallback,
  responseCallback,
});

export default {
    ChatController,
    ChatService
};
