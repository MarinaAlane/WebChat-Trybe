const chatModels = require('../models/chatModels');
const { generateMessage } = require('../utils/message');

const joinedChat = (socket) => {
  socket.broadcast.emit('joined', `Cliente ${socket.id} ingressou no chat.`);
};

const newMessage = (io, socket) => {
  socket.on('message', async (message) => {
    io.emit('message', generateMessage(message));
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
