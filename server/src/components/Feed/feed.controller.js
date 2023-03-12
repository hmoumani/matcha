import ControllerResponse from '../../utils/ControllerResponse';
import HttpStatusCode from '../../enums/HttpStatusCode';
import feedService from './feed.service';

const FeedController = {
  getUsers: async ({ userId }) => {
    let users;
    try {
      users = await feedService.getUsersSuggestions(userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'failed to retrieve users');
    }
    return ControllerResponse(HttpStatusCode.OK, users);
  },
  getNotifications: async ({ userId }) => {
    let notifications;
    try {
      notifications = await feedService.getUsersNotifications(userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'failed to retrieve notifications');
    }
    return ControllerResponse(HttpStatusCode.OK, notifications);
  },
  markAsSeen: async ({ userId }) => {
    try {
      await feedService.markAsSeen(userId);
    } catch (err) {
      return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'Error');
    }
    return ControllerResponse(HttpStatusCode.OK, 'Done');
  }
};

export default FeedController;
