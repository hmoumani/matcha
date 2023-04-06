import { getUserIdFromToken } from '../Auth/auth.middleware';

export default ({ router, ChatController, ChatValidator, makeValidatorCallback, responseCallback }) => {
    router.get('/getUserChats', getUserIdFromToken, responseCallback(ChatController.getUserChats));
    router.get('/getChatMessages/:userId', getUserIdFromToken, makeValidatorCallback(ChatValidator.getChatValidator),
    responseCallback(ChatController.getChatMessages));
  return router;
};
