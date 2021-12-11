const chatModels = require('../models/chatModels');
const { generateMessage } = require('../utils/message');

const joinedChat = (socket) => {
  socket.broadcast.emit('joined', `Cliente ${socket.id} ingressou no chat.`);
};

const newMessage = (io, socket) => {
  socket.on('message', async (message) => {
    const msg = generateMessage(message);
    io.emit(
      'message',
      `${msg.createdAt} - ${msg.nickname}: ${msg.chatMessage}`,
    );
    await chatModels.newMessageModel({ message });
  });
};

const outChat = (socket) => {
  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'endConnection',
      `Cliente ${socket.id} saiu do chat.`,
    );
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    joinedChat(socket);
    newMessage(io, socket);
    outChat(socket);
  });
};
