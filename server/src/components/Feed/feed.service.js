import UserModel from '../../models/UserModel';
import UserLikesModel from '../../models/UserLikesModel';

const feedService = {
  like: async (likerId, likedId) => {
    const userLikesModel = new UserLikesModel();
    await userLikesModel.insert({
      likerId,
      likedId
    });
    updateFameRate(likedId, 0.2);
  },
  dislike: async (dislikerId, dislikedId) => {
    // const userLikesModel = new UserLikesModel();
    // await userLikesModel.delete([
    //   ['liker_id', '=', likerId],
    //   ['liked_id', '=', likedId]
    // ])
    // TODO: decrease fame rate
    updateFameRate(likedId, -0.2);
  },
  async updateFameRate(userId, incrementValue) {
    const user = await UserService.find(userId);
    const userModel = UserModel();
    const { fame_rate } = user;

    if (fame_rate <= 1 || fame_rate >= 10) {
      return;
    }

    fame_rate += incrementValue;

    userModel.update(
      {
        fame_rate
      },
      ['user_id', '=', user.id]
    );
  }
};

export default feedService;
