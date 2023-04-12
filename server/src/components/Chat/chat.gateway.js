import { emitToUser } from '../User/user.gateway';
import MessageModel from '../../models/MessageModel';
import feedService from '../Feed/feed.service';
import UserService from '../User/user.service';
import NotificationModel from '../../models/NotificationModel';

const SEND_MESSAGE_EVENT = 'sendMessage';
const RECEIVE_MESSAGE_EVENT = 'receiveMessage';
const USER_MESSAGE_NOTIFICATION_EVENT = 'userMessageNotification';

const onSendMessageCallback = async (socket, message) => {
  try{
    const currentUserId = socket.userId;
    // check if users are matched
    if (!(await feedService.isLikedBy(message.receiver_id, currentUserId))
      || !(await feedService.isLikedBy(currentUserId, message.receiver_id))
      || !message.message
      || (await UserService.isBlockedBy(message.receiver_id, currentUserId))
      || (await UserService.isBlockedBy(currentUserId, message.receiver_id))) {
      return;
    }
    const messagModel = new MessageModel();
    await messagModel.insert({
        ...message,
        sender_id: currentUserId,
        created_at: new Date(),
    });
    emitToUser(message.receiver_id, RECEIVE_MESSAGE_EVENT, message);
    emitToUser(currentUserId, RECEIVE_MESSAGE_EVENT, message);
    const receiverUser = await UserService.find(message.receiver_id);
    const currentUser = await UserService.find(currentUserId);
    emitToUser(message.receiver_id, USER_MESSAGE_NOTIFICATION_EVENT, {
      avatar: currentUser.avatars?.[0]?.value , 
      msg: `You have received a message from ${currentUser.first_name} ${currentUser.last_name}`,
      title: 'new message',
      userId: currentUserId
    });
    const notificationModel = new NotificationModel();
    notificationModel.insert({
      seen: false,
      sender_id: currentUserId,
      receiver_id: message.receiver_id,
      type: 'new message',
      content: `You have received a message from ${currentUser.first_name} ${currentUser.last_name}`
    });
  }
  catch (err) {
    console.log('message not sent');
  }
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(SEND_MESSAGE_EVENT, (message) => onSendMessageCallback(userGatewaySocket, message));
};
