import AuthService from "./user.service";

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const loginData = await AuthService.login(httpRequest.body);
    return {
      statusCode: 200,
      body: {
        data: loginData
      }
    };
  }
};

export default AuthController;
