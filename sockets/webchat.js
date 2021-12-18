const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController');

const login = async ({ io, socket, nickname }) => {
  const userList = await userController.createUser({
    nickname,
    socketId: socket.id,
  });
  const messageList = await chatController.getMessages();
  socket.broadcast.emit('newUserAnnouncement', nickname);
  socket.emit('messageHistory', messageList);
  io.emit('connectedUsers', userList);
};

const disconnect = async ({ io }) => {
  const chatRoom = io.sockets.adapter.rooms.get('chat_room');
  const clients = chatRoom ? [...chatRoom] : [];
  const userList = await userController.cleanUserList(clients);
  io.emit('connectedUsers', userList);
};

// prettier-ignore
module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.join('chat_room');
    socket.on('login', async (nickname) => login({ io, socket, nickname }));
    socket.on('message', async ({ chatMessage, nickname }) => {
      const response = await chatController.createMessage({ message: chatMessage, nickname });
      return io.emit('message', response);
    });
    socket.on('setName', async (data) => {
      const userList = await userController.setName(data);
      socket.broadcast.emit('connectedUsers', userList);
    });
    socket.on('disconnect', async () => disconnect({ io }));
  });
