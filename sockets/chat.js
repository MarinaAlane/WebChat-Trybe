const utils = require('../utils/functions');
const messageController = require('../controllers/messageController');

let onlineUsers = [];

const getAllMessages = async () => {
  const messages = await messageController.getAllMessages();
  return messages;
};

const sendMessage = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = utils.dateGenerator();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    await messageController.messageRegister(chatMessage, nickname, date);
  });
};

const getHistory = async (socket, _io) => {
  const allMessages = await getAllMessages();
  for (let i = 0; i < allMessages.length; i += 1) {
    const { nickname, message, timestamp } = allMessages[i];
    socket.emit('history', `${timestamp} - ${nickname}: ${message}`);
  }
};

module.exports = (io) => io.on('connection', async (socket) => {
  socket.emit('messageServer', 'Coconut Straw: Converse sem grampos - Tecnologia Socket.io.');

  getHistory(socket, io);

  sendMessage(socket, io);

  let userId = (socket.id).substring(0, 16);
  onlineUsers.push(userId);

  socket.broadcast.emit('connection', userId);
  socket.emit('onLineUsers', onlineUsers);

  socket.on('nickname', ({ socketId, nickname }) => {
    userId = nickname;
    onlineUsers = onlineUsers.map((nick) => (nick === socketId ? nickname : nick));
    socket.broadcast.emit('usersUpdate', socketId, nickname);
  });
  
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((nick) => nick !== userId);
    socket.broadcast.emit('users', userId);
  });
});
