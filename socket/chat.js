const { formatDate } = require('../services');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);
  socket.emit('newUser', 'Welcome');
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${formatDate()} ${message.nickname}: ${message.chatMessage}`);
  });
});