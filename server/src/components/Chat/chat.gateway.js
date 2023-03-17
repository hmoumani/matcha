import { emitToUser } from '../User/user.gateway';
import MessageModel from '../../models/MessageModel';
import feedService from '../Feed/feed.service';
import UserService from '../User/user.service';

const SEND_MESSAGE_EVENT = 'sendMessage';
const RECEIVE_MESSAGE_EVENT = 'receiveMessage';

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
    console.log('message sent', message);
  }
  catch (err) {
    console.log('message not sent');
  }
};

export default (userGatewaySocket) => {
  userGatewaySocket.on(SEND_MESSAGE_EVENT, (message) => onSendMessageCallback(userGatewaySocket, message));
};
