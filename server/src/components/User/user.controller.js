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
  find: async (req, res) => {
    try {
      if (req.params.id === 'mine') req.params.id = req.userId;
      const user = await userService.find(req.params.id);
      return ControllerResponse(HttpStatusCode.OK, user);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'Error while retrieving user');
    }
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
    const parsedTags = JSON.parse(settings.common_tags);
    const parsedLocation = JSON.parse(settings.location);
    const formattedSettings = toCamelCase({
      ...settings,
      id: undefined,
      userId: undefined,
      commonTags: parsedTags,
      location: parsedLocation
    });
    return ControllerResponse(HttpStatusCode.OK, formattedSettings);
  },

  uploadAvatar: async (req) => {
    if (!req.file) return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'No file uploaded');
    try {
      userService.uploadAvatar({ userId: req.userId, value: req.file.filename });
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'could not upload avatar');
    }
    return ControllerResponse(HttpStatusCode.OK, 'avatar uploaded successfully!');
  },
  updateUserInfo: async (req) => {
    try {
      const userId = req.userId;
      await userService.updateUser(req.body, userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'could not update user infos');
    }
    return ControllerResponse(HttpStatusCode.OK, 'user infos updated successfully!');
  }
};

export default AuthController;
