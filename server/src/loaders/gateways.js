import { setupUserSocket } from '../components/User/user.gateway';
import addFeedGatewayEvents from '../components/Feed/feed.gateway';

export default async (server) => {
  setupUserSocket(server, (userGatewaySocket) => {
    addFeedGatewayEvents(userGatewaySocket);
  });
};
