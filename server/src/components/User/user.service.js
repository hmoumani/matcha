import { query } from '../../db/index';
import UserModel from '../../models/UserModel';
import TagModel from '../../models/TagModel';
import UserTagModel from '../../models/UserTagModel';
import ImageModel from '../../models/ImageModel';
import SettingsModel from '../../models/SettingsModel';

const UserService = {
  getUserPassions: async (userId) => {
    const { rows } = await query(
      'SELECT \
      tags.value as tag, \
      user_tags.id as user_tags_id \
      FROM users \
      JOIN user_tags ON users.id = user_tags.user_id \
      JOIN tags ON tags.id = user_tags.tag_id \
      where users.id = $1',
      [userId]
    );
    return rows;
  },

  getUserAvatars: async (userId) => {
    const { rows } = await query(
      'SELECT \
      id, value, created_at \
      FROM images \
      where images.user_id = $1',
      [userId]
    );
    return rows;
  },

  find: async (userId) => {
    let user = await query(
      'SELECT \
      users.id, \
      users.first_name, \
      users.last_name, \
      users.age, \
      users.location, \
      users.biography as bio, \
      users.sexual_orientation\
      FROM users\
    WHERE users.id = $1',
      [userId]
    );
    if (user.rows.length === 0) throw new Error('User not found');
    user = user.rows[0];
    const passions = await UserService.getUserPassions(userId);
    const avatars = await UserService.getUserAvatars(userId);
    user = {
      ...user,
      sexual_orientation: user.sexual_orientation ? user.sexual_orientation : 'heterosexual',
      passions,
      avatars
    };
    return user;
  },
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  like: async (userId) => {},

  updateSettings: async (userID, settings) => {
    const settingsModel = new SettingsModel();
    const condition = ['user_id', '=', userID];

    const currentSettings = await settingsModel.findOne(condition);

    const { maxFameRating, minFameRating } = currentSettings;
    const { location, commonTags } = settings;

    if (maxFameRating < minFameRating) {
      throw 'maxFameRating should be greater than minFameRating';
    }

    settings.location = JSON.stringify(location);
    settings.commonTags = JSON.stringify(commonTags);

    await settingsModel.update(settings, condition);
  },

  getSettings: async (userID) => {
    const settingsModel = new SettingsModel();
    const condition = ['user_id', '=', userID];

    return settingsModel.findOne(condition);
  },

  updateUser: async (requestBody, userId) => {
    const passions = requestBody.passions;
    delete requestBody.passions;
    const userModel = new UserModel();
    const tagModel = new TagModel();
    const userTagModel = new UserTagModel();
    userTagModel.delete(['user_id', '=', userId]);
    const condition = ['id', '=', userId];
    if (passions && passions.length > 0) {
      const tagsIds = await tagModel.insert(passions);
      await userTagModel.insert(userId, tagsIds);
    }
    userModel.update(requestBody, condition);
  },

  uploadAvatar: async (imageObj) => {
    const imageModel = new ImageModel();
    imageModel.insert(imageObj);
  }
};

export default UserService;
