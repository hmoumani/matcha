import HttpStatusCode from '../../enums/HttpStatusCode';
import ControllerResponse from '../../utils/ControllerResponse';
import userService from './user.service';
import {query} from '../../db/index';

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
      if (req.params.id === 'mine')
        req.params.id = req.userId;
      const user = await userService.find(req.params.id);
      return ControllerResponse(HttpStatusCode.OK, user);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, "Error while retrieving user");
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
   return ControllerResponse(HttpStatusCode.OK, settings);
  },

  uploadAvatar: async (req) => {
    if (!req.file)
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'No file uploaded');
    await query('insert into images (user_id, value) values ($1, $2)', [req.userId, req.file.filename]);
    return ControllerResponse(HttpStatusCode.OK, req.file);
  },
  updateUserInfo: async (req) => {
    try{
      const userId = req.userId;
      await userService.updateUser(req.body, userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'could not update user infos');
    }
    return ControllerResponse(HttpStatusCode.OK, 'user infos updated successfully!');
  },
};

export default AuthController;
