import { Server } from 'socket.io';
import { getUserFromSocket } from '../Auth/auth.middleware';
import UserService from './user.service';

const connectedUsers = new Map();
let userGatewaySocket = null;

const onConnection = async (socket, addEvents) => {
  const userId = socket.userId;
  if (!connectedUsers.has(userId)) {
    connectedUsers.set(userId, []);
  }
  connectedUsers.get(userId).push(socket.id);
  console.table(connectedUsers);
  socket.on('disconnect', () => onDisconnect(socket));
  addEvents?.(socket);
};

const updateUserLastConnection = (userId) => {
  UserService.updateUser(
    {
      last_connection: new Date()
    },
    userId
  );
};

const onDisconnect = async (socket) => {
  for (const [userId, sockets] of connectedUsers) {
    const index = sockets.indexOf(socket.id);
    if (index !== -1) {
      sockets.splice(index, 1);
      if (sockets.length === 0) {
        connectedUsers.delete(userId);
        updateUserLastConnection(userId);
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
  console.log({ msg: data.msg });
  sockets.forEach((socketId) => {
    userGatewaySocket.to(socketId).emit(event, data);
  });
};

export const setupUserSocket = async (server, addEventsCallback) => {
  const options = {
    cors: {
      origin: '*' //TODO CHANGE
    }
  };

  userGatewaySocket = new Server(server, options);
  userGatewaySocket.use(getUserFromSocket);
  userGatewaySocket.on('connection', (socket) => onConnection(socket, addEventsCallback));

  return userGatewaySocket;
};
