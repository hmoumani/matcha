import UserModel from '../../models/UserModel';
import UserService from '../User/user.service';
import UserLikesModel from '../../models/UserLikesModel';
import NotificationModel from '../../models/NotificationModel';
import { isClientOnline } from '../User/user.gateway';

const feedService = {
  async updateFameRate(userId, incrementValue) {
    const user = await UserService.find(userId);
    const userModel = new UserModel();
    let { fame_rate } = user;

    if (fame_rate + incrementValue <= 1 || fame_rate + incrementValue >= 10) {
      return;
    }

    userModel.update(
      {
        fame_rate: fame_rate + incrementValue
      },
      ['id', '=', user.id]
    );
  },
  async like(likerId, likedId) {
    const userLikesModel = new UserLikesModel();
    await userLikesModel.insert({
      likerId,
      likedId
    });
    this.updateFameRate(likedId, 0.2);
  },
  async isLikedBy(firstUserId, secondUserId) {
    const userLikesModel = new UserLikesModel();
    const LikeRow = await userLikesModel.findOne([
      ['likerId', firstUserId],
      ['likedId', secondUserId]
    ]);
    return LikeRow !== null && LikeRow !== undefined;
  },
  async disLike(dislikerId, dislikedId) {
    // TODO: decrease fame rate
    this.updateFameRate(dislikedId, -0.2);
  },
  async getUsersSuggestions(userId) {
    const userModel = new UserModel();
    const users = await userModel.getSuggestedUsers(userId);
    users.rows.forEach(async user => {
      user.isOnline = isClientOnline(user.id)
    });
    return users.rows;
  },
  getUsersNotifications(userId) {
    const notificationModel = new NotificationModel();
    return notificationModel.find(['receiver_id', '=', userId], null, 'notifications.created_at');
  },
  markAsSeen(userId) {
    const notificationModel = new NotificationModel();
    return notificationModel.update({ seen: true }, ['receiver_id', '=', userId]);
  }
};

export default feedService;
