import userService from "./user.service";

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  find: async (userId) => {
    const user = await userService.find(userId);
    return {
      statusCode: 200,
      body: {
        data: user
      }
    };
  }
};

export default AuthController;
