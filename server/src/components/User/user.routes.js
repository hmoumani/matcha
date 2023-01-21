import { getUserIdFromToken } from '../Auth/auth.middleware';
import { avatarLimit } from '../User/user.middleware';
import imageUpload from '../../utils/image.upload';

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
    router.put('/avatar', [getUserIdFromToken, avatarLimit], imageUpload, responseCallback(UserController.uploadAvatar));
  return router;
};
