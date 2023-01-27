import HttpStatusCode from '../../enums/HttpStatusCode';
import ControllerResponse from '../../utils/ControllerResponse';
import userService from './user.service';
import _ from 'lodash';

const toCamelCase = (obj) =>
  _.reduce(
    obj,
    (result, value, key) => {
      result[_.camelCase(key)] = value;
      return result;
    },
    {}
  );

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
    const userId = req.userId;
    await userService.updateSettings(userId, settings);
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
    const userId = req.userId;
    const settings = await userService.getSettings(userId);
    console.log(settings.common_tags);
    const parsedTags = JSON.parse(settings.common_tags);
    const formattedSettings = toCamelCase({
      ...settings,
      id: undefined,
      userId: undefined,
      commonTags: parsedTags
    });
    return ControllerResponse(HttpStatusCode.OK, formattedSettings);
  }
};

export default AuthController;
