const { formatDate } = require('../services');

const { storeMessage, getAllMessages } = require('../models/socketModel');

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`a user ${socket.id} connected`);

  socket.emit('history', await getAllMessages());

  socket.on('message', async (message) => {
    await storeMessage(message.chatMessage, message.nickname, formatDate());
    io.emit('message', `${formatDate()} ${message.nickname}: ${message.chatMessage}`);
  });
});