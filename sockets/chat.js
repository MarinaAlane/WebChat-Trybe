const dateTypo = require('../utils/dateTypo');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Mensagem ${message.nickname}: ${message.chatMessage}`);
    io.emit('message', `${dateTypo()} - ${message.nickname}: ${message.chatMessage}`);
  });
});