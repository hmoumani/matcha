import userService from './user.service';
import ControllerResponse from '../../utils/ControllerResponse';
const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  find: async (req, res) => {
    try{
      if (req.userId === 'mine');
        req.userId = req.userId;
      const user = await userService.find(req.userId);
    } catch (err) {
      return ControllerResponse(400, "Error while retrieving user");
    }
    return ControllerResponse(200, user);
  },

  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  like: async (userId) => {
    const data = await userService.like(userId);
    return {
      statusCode: 200,
      body: {
        data
      }
    };
  }
};

export default AuthController;
