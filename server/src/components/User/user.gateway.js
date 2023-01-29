import { Server } from 'socket.io';
import { getUserFromSocket } from '../Auth/auth.middleware';

const connectedUsers = new Map();
let userGatewaySocket = null;

const onConnection = async (socket) => {
  console.log('a user connected');
  const userId = socket.user.id;
  if (!connectedUsers.has(userId)) {
    connectedUsers.set(userId, []);
  }
  connectedUsers.get(userId).push(socket.id);
  console.table(connectedUsers);
  socket.on('disconnect', () => onDisconnect(socket));
};

const onDisconnect = async (socket) => {
  console.log('user disconnected');
  for (const [userId, sockets] of connectedUsers) {
    const index = sockets.indexOf(socket.id);
    if (index !== -1) {
      sockets.splice(index, 1);
      if (sockets.length === 0) {
        connectedUsers.delete(userId);
      }
      break;
    }
  }
};

export const isClientOnline = (userId) => {
  return connectedUsers.has(userId);
};

export const emitToUser = (userId, event, data) => {
  const sockets = connectedUsers.get(userId);
  if (!sockets) {
    return;
  }
  sockets.forEach((socketId) => {
    userGatewaySocket.to(socketId).emit(event, data);
  });
};

export default (server) => {
  const options = {
    cors: {
      origin: '*' //TODO CHANGE
    }
  };
  userGatewaySocket = new Server(server, options);
  userGatewaySocket.use(getUserFromSocket);
  userGatewaySocket.on('connection', onConnection);
};
