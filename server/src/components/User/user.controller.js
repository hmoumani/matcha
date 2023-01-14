import HttpStatusCode from '../../enums/HttpStatusCode';
import ControllerResponse from '../../utils/ControllerResponse';
import userService from './user.service';

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
  },

  /**
   * Update User Settings
   * @async
   * @method
   * @returns {Promise.<ControllerResponse> }
   */
  updateSettings: async (req) => {
    const settings = req.body;
    const userID = 6;
    await userService.updateSettings(userID, settings);
    return ControllerResponse(HttpStatusCode.OK, 'Setting Updated in successfully!');
  },

  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getSettings: async (req) => {
    const userId = 6; // TODO Remove
    const settings = await userService.getSettings(userId);
    return ControllerResponse(HttpStatusCode.OK, settings);
  }
};

export default AuthController;
