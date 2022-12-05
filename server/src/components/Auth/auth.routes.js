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
  // router.get("/about", function (req, res) {
  //   res.send("About this wiki");
  // });
  return router;
};
