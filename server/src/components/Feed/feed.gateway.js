import { emitToUser } from '../User/user.gateway';
import UserService from '../User/user.service';
import feedService from './feed.service';

const USER_LIKE_EVENT = 'userLike';
const USER_DIS_LIKE_EVENT = 'userUnMatch';

const matchedMessage = (user) => `you are matched with ${user.first_name} ${user.last_name}`;

const onUserLikeCallback = async (socket, likedUserId) => {
  const currentUserId = socket.userId;
  if (feedService.isUserLikedBy(currentUserId, likedUserId)) {
    return;
  }
  const currentUser = await UserService.find(currentUserId);

  await feedService.like(currentUserId, currentUserId);

  // if the likerUser isn't already liked by the use he wanna like
  if (!feedService.isUserLikedBy(likedUserId, currentUserId)) {
    const msg = `${currentUser?.first_name} ${currentUser?.last_name} liked your profile`;
    emitToUser(likedUserId, USER_LIKE_EVENT, { currentUser, msg });
  }
  // otherwise
  // acknowledge both of them that they are matched
  // acknowledge the liked user
  const msg = matchedMessage(currentUser);
  emitToUser(likedUserId, USER_LIKE_EVENT, { currentUser, msg });
  // acknowledge the current user
  const likedUser = await UserService.find(socket.userId);
  emitToUser(likerUser, USER_LIKE_EVENT, { likedUser, msg: matchedMessage(likedUser) });
};

const onUserDisLikeCallback = async (socket, disLikedUserId) => {
  const disLiker = await UserService.find(socket.userId);
  await feedService.disLike(disLiker.id, disLikedUserId);
  const msg = `${disLiker?.first_name} ${disLiker?.last_name} disLiked your profile`;
  emitToUser(disLikedUserId, USER_DIS_LIKE_EVENT, { disLiker, msg });
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(USER_LIKE_EVENT, (likedUserId) => onUserLikeCallback(userGatewaySocket, likedUserId));
  userGatewaySocket.on(USER_DIS_LIKE_EVENT, (disLikedUserId) =>
    onUserDisLikeCallback(userGatewaySocket, disLikedUserId)
  );
};
