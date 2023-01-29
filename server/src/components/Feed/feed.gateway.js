import { emitToUser } from '../User/user.gateway';
import UserService from '../User/user.service';
import feedService from './feed.service';

const USER_LIKE_EVENT = 'userLike';

const onUserLikeCallback = async (socket, likedUserId) => {
  const liker = await UserService.find(socket.userId);
  await feedService.like(liker.id, likedUserId);
  const msg = `${liker?.first_name} ${liker?.last_name} liked your profile`;
  emitToUser(likedUserId, USER_LIKE_EVENT, { liker, msg });
};

const onUserUnLikeCallback = async (socket, unLikedUserId) => {
  const unLiker = await UserService.find(socket.userId);
  await feedService.unLike(unLiker.id, unLikedUserId);
  const msg = `${unLiker?.first_name} ${unLiker?.last_name} unLiked your profile`;
  emitToUser(unLikedUserId, USER_LIKE_EVENT, { liker, msg });
  console.log(msg)
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(USER_LIKE_EVENT, (likedUserId) => onUserLikeCallback(userGatewaySocket, likedUserId));
  userGatewaySocket.on(USER_LIKE_EVENT, (unlikedUserId) => onUserUnLikeCallback(userGatewaySocket, unlikedUserId));
};
