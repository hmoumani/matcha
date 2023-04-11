import UserModel from '../../models/UserModel';
import { isClientOnline } from '../User/user.gateway';

const chatService = {
    getUserChats: async (userId) => {
        const userModel = new UserModel();
        const chats = await userModel.getUserChats(userId);
        chats.rows.forEach(chat => {
            chat.user.isOnline = isClientOnline(chat.user.id);
        });
        return chats.rows;
    },
    getChatMessages: async (currentUserId, chatUserId) => {
        const userModel = new UserModel();
        const chats = await userModel.getChatMessages(currentUserId, chatUserId);
        return chats.rows;
    }
};

export default chatService;
