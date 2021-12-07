const utils = require('../utils/functions');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('messageServer', 'Coconut Straw diz: Converse sem grampos - tecnologia Socket.io.');

  socket.on('message', (message) => {
    const userMessage = { chatMessage: `${utils.dateGenerator()} ${socket.id}: ${message}`, 
      nickname: socket.id };

    console.log(userMessage);
  
    io.emit('message', userMessage);
  });
});
