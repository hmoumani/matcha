import { checkDuplicateUsernameOrEmail, checkEmailexists, HashPasswordAndCheckCommunWord, getUserIdFromToken } from './auth.middleware';
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
export default ({ router, AuthController, AuthValidator, makeValidatorCallback, responseCallback }) => {
  router.post('/login', makeValidatorCallback(AuthValidator.validateLogin), responseCallback(AuthController.login));
  router.post('/logout', responseCallback(AuthController.logout));
  router.post(
    '/register',
    makeValidatorCallback(AuthValidator.validateRegistration),
    [checkDuplicateUsernameOrEmail, HashPasswordAndCheckCommunWord],
    responseCallback(AuthController.register)
  );
  router.post(
    '/verifyEmail',
    makeValidatorCallback(AuthValidator.validateEmailValidation),
    responseCallback(AuthController.verifyEmail)
  );
  router.post(
    '/resetPasswordEmail',
    makeValidatorCallback(AuthValidator.validateresetPasswordEmail),
    [checkEmailexists],
    responseCallback(AuthController.resetPasswordEmail)
  );
  router.post(
    '/resetPassword',
    makeValidatorCallback(AuthValidator.validateresetPassword),
    [HashPasswordAndCheckCommunWord],
    responseCallback(AuthController.resetPassword)
  );
  router.post(
    '/firstLogin',
    makeValidatorCallback(AuthValidator.validateFirstLogin),
    [getUserIdFromToken],
    responseCallback(AuthController.firstLogin)
  );
  router.get('/getUserToken', responseCallback(AuthController.getUserToken));
  return router;
};
