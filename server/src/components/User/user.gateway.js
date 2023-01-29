const connectedUsers = new Map();

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

const socket = io(server);
socket.use(authenticate);
socket.on('connection', onConnection);
socket.on('disconnect', onDisconnect);
socket.on('chat message', onChatMessage);
