import ControllerResponse from '../../utils/ControllerResponse';
import HttpStatusCode from '../../enums/HttpStatusCode';
import chatService from './chat.service';

const ChatController = {
    getUserChats: async (req, res) => {
        try{
            return ControllerResponse(HttpStatusCode.OK, await chatService.getUserChats(req.userId));
        } catch (err) {
            return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'failed to retrieve chats' + err);
        }
    },
    getChatMessages: async (req, res) => {
        try{
            return ControllerResponse(HttpStatusCode.OK, await chatService.getChatMessages(req.userId, req.params.userId));
        } catch (err) {
            return ControllerResponse(HttpStatusCode.BAD_REQUEST, 'failed to retrieve chat messages' + err);
        }
    }
};

export default ChatController;
