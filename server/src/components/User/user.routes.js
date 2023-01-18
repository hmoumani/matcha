import { getUserIdFromToken } from '../Auth/auth.middleware';
import userValidator from './user.validator';

/**
 *
 * @param {Object} AuthRouter
 * @param {ExpressRouter} AuthRouter.router
 * @param {AuthController} AuthRouter.AuthController
 * @param {AuthValidator} AuthRouter.AuthValidator
 * @param {makeExpressCallback} AuthRouter.makeExpressCallback
 * @param {makeValidatorCallback} AuthRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
export default ({ router, UserController, responseCallback, UserValidator, makeValidatorCallback }) => {
  router.get('/settings', getUserIdFromToken, responseCallback(UserController.getSettings));
  router.get('/:id', responseCallback(UserController.find));
  router.get('/like/:id', responseCallback(UserController.like));
  router.put(
    '/settings',
    getUserIdFromToken,
    makeValidatorCallback(UserValidator.updateSettings),
    responseCallback(UserController.updateSettings)
  );
  return router;
};
