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

export default (userGatewaySocket) => {
  userGatewaySocket.on(USER_LIKE_EVENT, (likedUserId) => onUserLikeCallback(userGatewaySocket, likedUserId));
};
