import UserModel from '../../models/UserModel';

const chatService = {
    getUserChats: async (userId) => {
        const userModel = new UserModel();
        const chats = await userModel.getUserChats(userId);
        return chats.rows;
    },
    getChatMessages: async (currentUserId, chatUserId) => {
        const userModel = new UserModel();
        const chats = await userModel.getChatMessages(currentUserId, chatUserId);
        return chats.rows;
    }
};

export default chatService;
