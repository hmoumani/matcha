import { setupUserSocket } from '../components/User/user.gateway';
import addFeedGatewayEvents from '../components/Feed/feed.gateway';
import addChatGatewayEvents from '../components/Chat/chat.gateway';

export default async (server) => {
  setupUserSocket(server, (userGatewaySocket) => {
    addFeedGatewayEvents(userGatewaySocket);
    addChatGatewayEvents(userGatewaySocket);
  });
};
