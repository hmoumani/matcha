import { Server } from 'socket.io';
import { createServer } from 'http';

const connectedUsers = new Map();
let userGatewaySocket = null;

const authenticate = async (socket, next) => {
  const userToken = socket.handshake.headers.cookie.split('userToken=')[1];
  const user = await getUserFromToken(userToken);
  if (!user) {
    return next(new Error('Unauthorized'));
  }
  socket.user = user;
  next();
};

const onConnection = async (socket) => {
  console.log('a user connected');
  const userId = socket.user._id;
  if (!connectedUsers.has(userId)) {
    connectedUsers.set(userId, []);
  }
  connectedUsers.get(userId).push(socket.id);
};

const onDisconnect = async () => {
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

export default (app) => {
  const server = createServer(app);
  userGatewaySocket = new Server(server);
  userGatewaySocket.use(authenticate);
  userGatewaySocket.on('connection', onConnection);
  userGatewaySocket.on('disconnect', onDisconnect);
};
