import { getUserIdFromToken } from '../Auth/auth.middleware';
import { checkAvatarLimit, checkIsBlockedRelation } from '../User/user.middleware';
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
  router.get('/like/:id', responseCallback(UserController.like));
  router.put(
    '/settings',
    getUserIdFromToken,
    makeValidatorCallback(UserValidator.updateSettings),
    responseCallback(UserController.updateSettings)
  );
  router.put('/avatar', [getUserIdFromToken, checkAvatarLimit], imageUpload, responseCallback(UserController.uploadAvatar));
  router.put('/', getUserIdFromToken, makeValidatorCallback(UserValidator.updateUserInfo), responseCallback(UserController.updateUserInfo));
  router.post('/block', getUserIdFromToken, makeValidatorCallback(UserValidator.blockUser), responseCallback(UserController.blockUser));
  router.post('/report', getUserIdFromToken, makeValidatorCallback(UserValidator.reportUser), responseCallback(UserController.reportUser));
  router.get('/:id', makeValidatorCallback(UserValidator.getUserValidator), [getUserIdFromToken, checkIsBlockedRelation], responseCallback(UserController.find));
  return router;
};
