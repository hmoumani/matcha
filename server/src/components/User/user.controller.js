import HttpStatusCode from '../../enums/HttpStatusCode';
import ControllerResponse from '../../utils/ControllerResponse';
import userService from './user.service';
import UserService from './user.service';
import { toCamelCase } from '../../utils/transformers';
import { emitToUser } from '../User/user.gateway';
import NotificationModel from '../../models/NotificationModel';

const USER_VISIT_EVENT = 'userVisit';

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
      const user = await userService.find(req.params.id, req.userId);
      const currentUser = await userService.find(req.userId);
      if (req.params.id != req.userId) 
      {
        const notificationModel = new NotificationModel();
        emitToUser(parseInt(req.params.id), USER_VISIT_EVENT, {
          msg:`${currentUser.first_name} ${currentUser.last_name} just visited your profile.`,
          avatar: currentUser.avatars?.[0]?.value,
          title: 'user visit',
          userId: req.userId
        });
        notificationModel.insert({
          seen: false,
          sender_id: req.userId,
          receiver_id: parseInt(req.params.id),
          type: 'user visit',
          content: `${currentUser.first_name} ${currentUser.last_name} just visited your profile.`
        });
      }
      return ControllerResponse(HttpStatusCode.OK, toCamelCase(user));
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'Error while retrieving user' + err);
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
    const parsedTags = JSON.parse(settings.common_tags ?? '[]');
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
  },

  blockUser: async (req) => {
    const { blockerId, blockedId } = req.body;
    try {
      await UserService.blockUser(blockerId, blockedId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'blocking action failed');
    }
    return ControllerResponse(HttpStatusCode.OK, 'User blocked successfully');
  },

  reportUser: async (req) => {
    const { reportedId, reporterId } = req.body;
    try {
      await UserService.reportUser(reporterId, reportedId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'reporting user failed');
    }
    return ControllerResponse(HttpStatusCode.OK, 'User reported successfully');
  },
  searchUser: async (req) => {
    const { keyword } = req.params;
    const { userId } = req;
    let restuls;
    try {
      if (keyword.length < 1) return ControllerResponse(HttpStatusCode.OK, []);
      restuls = await userService.searchUser(keyword, userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'searching a user failed' + err);
    }
    return ControllerResponse(HttpStatusCode.OK,  restuls);
  }
};

export default AuthController;
