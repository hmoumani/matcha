import { query } from '../../db/index';
import UserLikesModel from '../../models/UserLikesModel';

const feedService = {
  like: async (likerId, likedId) => {
    const userLikesModel = new UserLikesModel();
    await userLikesModel.insert({
        likerId,
        likedId,
    })
  }
};

export default feedService;
