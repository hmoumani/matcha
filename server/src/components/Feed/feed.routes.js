import { getUserIdFromToken } from '../Auth/auth.middleware';

export default ({ router, FeedController, FeedValidator, makeValidatorCallback, responseCallback }) => {
  router.get('/profiles', getUserIdFromToken, responseCallback(FeedController.getUsers));
  router.get('/notifications', getUserIdFromToken, responseCallback(FeedController.getNotifications));
  router.post('/markAsSeen', getUserIdFromToken, responseCallback(FeedController.markAsSeen));
  return router;
};
