import AuthService from "./auth.service";

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
  } ,
    /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  register: async (httpRequest) => {
    const registerData = await AuthService.register(httpRequest.body);
    return {
      statusCode: 200,
      body: {
        data: registerData
      }
    };
  }
};

export default AuthController;
