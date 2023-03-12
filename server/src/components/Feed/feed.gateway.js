import { emitToUser } from '../User/user.gateway';
import UserService from '../User/user.service';
import feedService from './feed.service';
import NotificationModel from '../../models/NotificationModel';

const USER_LIKE_EVENT = 'userLike';
const USER_DIS_LIKE_EVENT = 'userUnMatch';
const USER_MATCH_EVENT = 'userMatch';

const matchedMessage = (user) => `you are matched with ${user.first_name} ${user.last_name}`;
const userLikeMessage = (user) => `${user?.first_name} ${user?.last_name} liked your profile`;

const onUserLikeCallback = async (socket, likedUserId) => {
  const notificationModel = new NotificationModel();
  const currentUserId = socket.userId;
  if (await feedService.isLikedBy(currentUserId, likedUserId) || currentUserId === likedUserId) {
    return;
  }
  const currentUser = await UserService.find(currentUserId);

  await feedService.like(currentUserId, likedUserId);

  // if the likerUser isn't already liked by the use he wanna like
  if (!(await feedService.isLikedBy(likedUserId, currentUserId))) {
    emitToUser(likedUserId, USER_LIKE_EVENT, { avatar: currentUser.avatars?.[0]?.value , msg: userLikeMessage(currentUser), title: 'New Like' });
    notificationModel.insert({
      seen: false,
      sender_id: currentUserId,
      receiver_id: likedUserId,
      type: 'like',
      content: userLikeMessage(currentUser)
    });
    return;
  }

  // otherwise
  // acknowledge both of them that they are matched
  // acknowledge the liked user
  emitToUser(likedUserId, USER_MATCH_EVENT, { avatar: currentUser.avatars?.[0]?.value , msg: matchedMessage(currentUser), title: 'Matched' });
  
  // acknowledge the current user
  const likedUser = await UserService.find(likedUserId);
  emitToUser(currentUserId, USER_MATCH_EVENT, { avatar: likedUser.avatars?.[0]?.value , msg: matchedMessage(likedUser), title: 'Matched' });
  notificationModel.insert({
    seen: false,
    sender_id: currentUserId,
    receiver_id: likedUserId,
    type: 'matched',
    content: matchedMessage(currentUser)
  });
  notificationModel.insert({
    seen: false,
    sender_id: likedUserId,
    receiver_id: currentUserId,
    type: 'matched',
    content: matchedMessage(likedUser)
  });
};

const onUserDisLikeCallback = async (socket, disLikedUserId) => {
  if (socket.userId === disLikedUserId) return;
  const notificationModel = new NotificationModel();
  const disLiker = await UserService.find(socket.userId);
  await feedService.disLike(disLiker.id, disLikedUserId);
  const msg = `${disLiker?.first_name} ${disLiker?.last_name} disLiked your profile`;
  emitToUser(disLikedUserId, USER_DIS_LIKE_EVENT, { avatar: disLiker.avatars?.[0]?.value,
    msg: msg,
    title: 'dislike'
  });

  notificationModel.insert({
    seen: false,
    sender_id: socket.userId,
    receiver_id: disLikedUserId,
    type: 'dislike',
    content: msg
  });
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(USER_LIKE_EVENT, (likedUserId) => onUserLikeCallback(userGatewaySocket, likedUserId));
  userGatewaySocket.on(USER_DIS_LIKE_EVENT, (disLikedUserId) =>
    onUserDisLikeCallback(userGatewaySocket, disLikedUserId)
  );
};
