import { emitToUser } from '../User/user.gateway';
import UserService from '../User/user.service';
import feedService from './feed.service';

const USER_LIKE_EVENT = 'userLike';
const USER_DIS_LIKE_EVENT = 'userUnMatch';

const onUserLikeCallback = async (socket, likedUserId) => {
  const liker = await UserService.find(socket.userId);
  await feedService.like(liker.id, likedUserId);
  const msg = `${liker?.first_name} ${liker?.last_name} liked your profile`;
  emitToUser(likedUserId, USER_LIKE_EVENT, { liker, msg });
};

const onUserDisLikeCallback = async (socket, disLikedUserId) => {
  const disLiker = await UserService.find(socket.userId);
  await feedService.disLike(disLiker.id, disLikedUserId);
  const msg = `${disLiker?.first_name} ${disLiker?.last_name} disLiked your profile`;
  emitToUser(disLikedUserId, USER_DIS_LIKE_EVENT, { disLiker, msg });
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(USER_LIKE_EVENT, (likedUserId) => onUserLikeCallback(userGatewaySocket, likedUserId));
  userGatewaySocket.on(USER_DIS_LIKE_EVENT, (disLikedUserId) => onUserDisLikeCallback(userGatewaySocket, disLikedUserId));
};
