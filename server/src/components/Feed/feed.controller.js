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
  }
};

export default FeedController;
