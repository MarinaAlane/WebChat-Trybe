const { formatDate } = require('../services');

const { saveMessage, getAllMessages } = require('../models/socketModel');

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`a user ${socket.id} connected`);
  socket.emit('newUser', 'Welcome');
  io.emit('history', await getAllMessages());
  socket.on('message', async (message) => {
    console.log(message);
    await saveMessage(message.chatMessage, message.nickname, formatDate());
    io.emit('message', `${formatDate()} ${message.nickname}: ${message.chatMessage}`);
  });
});