import UserModel from '../../models/UserModel';
import UserService from '../User/user.service';
import UserLikesModel from '../../models/UserLikesModel';

const feedService = {
  async updateFameRate(userId, incrementValue) {
    const user = await UserService.find(userId);
    const userModel = new UserModel();
    let { fame_rate } = user;

    if (fame_rate <= 1 || fame_rate >= 10) {
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
    this.updateFameRate(dislikerId, -0.2);
  },
  async getUsersSuggestions(userId) {

    const userModel = new UserModel();
    const users = await userModel.getSuggestedUsers(userId);
    return users.rows;
    // return userModel.getSuggestedUsers(userId);
    // const user = await UserService.find(userId);
    // const { sexual_orientation } = user;
    // console.log({ sexual_orientation });
    // const conditions = [['gender', sexual_orientation]];
    // const userModel = new UserModel();
    // let users = await userModel.find(conditions, 10, 'RANDOM()');
    // for (let i = 0; i < users.length; i++) {
    //   users[i] = await UserService.addShit(users[i]);
    //   users[i].distance = getDistanceBetweenTwoLocations(users[i].location, user.location);
    //   // users[i].address = await getAddressFromLocation(users[i].location);
    //   // users[i].address = 'Casa, Morocco' // TODO
    //   // console.log(users[i].address);
    // }
    // return users;
  }
};

export default feedService;
