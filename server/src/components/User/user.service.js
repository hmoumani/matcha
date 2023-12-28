import { query } from '../../db/index';
import UserModel from '../../models/UserModel';
import TagModel from '../../models/TagModel';
import UserTagModel from '../../models/UserTagModel';
import ImageModel from '../../models/ImageModel';
import SettingsModel from '../../models/SettingsModel';
import ReportedUsersModel from '../../models/reportedUsersModel';
import BlockedUsersModel from '../../models/BlockedUsersModel';
import { isClientOnline } from './user.gateway';

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

    const passions = rows.map((row) => row.tag);
    return passions;
  },

  getUserAvatars: async (userId) => {
    const { rows: avatars } = await query(
      'SELECT \
      id, value, created_at \
      FROM images \
      where images.user_id = $1',
      [userId]
    );
    return avatars.map((avatar) => {
      avatar.value = `http://localhost:1574/public/avatars/${avatar.value}`; // TODO
      return avatar;
    });
  },

  find: async (userId, currentUserId) => {
    let user = await query(
      'SELECT \
      users.id, \
      users.first_name, \
      users.last_name, \
      users.age, \
      users.location, \
      users.fame_rate,\
      users.is_auto_locator_enabled, \
      users.biography, \
      users.sexual_orientation,\
      users.gender,\
      users.last_connection, \
      users.email \
      FROM users\
    WHERE users.id = $1',
      [userId]
    );
    if (user.rows.length === 0) throw new Error('User not found');
    user = user.rows[0];
    user = await UserService.addShit(user);
    user.isOnline = isClientOnline(user.id);
    let distance_query = `select (
      6371 * acos(
        cos(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * cos(radians($1)) *
        cos(radians(CAST(CAST(location AS JSON)->>'lng' AS double precision)) - radians($2)) +
        sin(radians(CAST(CAST(location AS JSON)->>'lat' AS double precision))) * sin(radians($3))
      )
    ) AS distance
    from users
    where id = $4`;
    if (currentUserId && userId != currentUserId) {
      let distance = await query(distance_query, [
          user.location.lat,
          user.location.lng,
          user.location.lat,
          currentUserId
        ]);
      distance = distance.rows[0].distance;
      user.distance = distance;
    }
    return user;
  },

  async addShit(user) {
    const userId = user.id;
    const passions = await UserService.getUserPassions(userId);
    const avatars = await UserService.getUserAvatars(userId);

    const genderToOrientationMap = {
      male: 'male',
      female: 'female',
      null: 'both'
    };

    user = {
      ...user,
      gender: user.gender || 'male', // Todo REMOVE
      is_auto_locator_enabled: user.is_auto_locator_enabled !== null ? user.is_auto_locator_enabled : true,
      passions,
      avatars,
      location: JSON.parse(user.location)
    };

    if (!user.sexual_orientation) {
      user.sexual_orientation = genderToOrientationMap[user.gender] || 'both';
    }
    return user;
  },

  updateSettings: async (userID, settings) => {
    const settingsModel = new SettingsModel();
    const condition = ['user_id', '=', userID];

    const currentSettings = await settingsModel.findOne(condition);

    const { maxFameRating, minFameRating } = currentSettings;
    const { location, commonTags } = settings;

    if (maxFameRating < minFameRating) {
      throw new Error('maxFameRating should be greater than minFameRating');
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
    userTagModel.delete([['user_id', '=', userId]]);
    const condition = ['id', '=', userId];
    if (passions && passions.length > 0) {
      const tagsIds = await tagModel.insert(passions);
      await userTagModel.insert(userId, tagsIds);
    }
    userModel.update(requestBody, condition);
    const settingsModel = new SettingsModel();
    const settings = await settingsModel.findOne([['user_id', '=', userId]]);
    if (!settings.location) {
      const { location } = requestBody;
      if (location) {
        await settingsModel.update({ location: location }, ['user_id', '=', userId]);
      }
    }
  },

  uploadAvatar: async (imageObj) => {
    const imageModel = new ImageModel();
    imageModel.insert(imageObj);
  },

  reportUser: async (reporterId, reportedId) => {
    const reportedUsersModel = new ReportedUsersModel();
    await reportedUsersModel.insert({
      reporterId,
      reportedId,
      reason: 'Fake account'
    });
  },

  blockUser: async (blockerId, blockedId) => {
    const isAlreadyBlocked = await UserService.isBlockedBy(blockerId, blockedId);
    if (isAlreadyBlocked) {
      throw 'already blocked';
    }
    const blockedUsersModel = new BlockedUsersModel();
    await blockedUsersModel.insert({
      blockerId,
      blockedId
    });
  },

  async isBlockedBy(firstUserId, secondUserId) {
    const blockedUsersModel = new BlockedUsersModel();
    const blockRow = await blockedUsersModel.findOne([
      ['blockerId', firstUserId],
      ['blockedId', secondUserId]
    ]);
    return blockRow !== null && blockRow !== undefined;
  },

  async searchUser(keyword, userId) {
    const userModel = new UserModel();
    const users = await userModel.searchUsers(keyword, userId);
    return users.rows;
  }
};

export default UserService;
