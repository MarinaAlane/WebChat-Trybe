const dateInform = require('../utils/dateInform');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Mensagem ${message.nickname}: ${message.chatMessage}`);
    io.emit('message', `${dateInform()} - ${message.nickname}: ${message.chatMessage}`);
  });
});