import { query } from '../../db/index';
import UserLikesModel from '../../models/UserLikesModel';

const feedService = {
  like: async (likerId, likedId) => {
    const userLikesModel = new UserLikesModel();
    await userLikesModel.insert({
        likerId,
        likedId,
    })
  },
  unlike: async (likerId, likedId) => {
    const userLikesModel = new UserLikesModel();
    await userLikesModel.delete([
      ['user_id', '=', userId],
      ['user_id', '=', userId]
    ])
  }
};

export default feedService;
