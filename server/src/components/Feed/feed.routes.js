import { getUserIdFromToken } from '../Auth/auth.middleware';

export default ({ router, FeedController, FeedValidator, makeValidatorCallback, responseCallback }) => {
  router.get('/profiles', getUserIdFromToken, responseCallback(FeedController.getUsers));
  return router;
};
