const utils = require('../utils/functions');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('serverMessage', 'Coconut Straw diz: Converse sem grampos - tecnologia Socket.io.');

  socket.on('clientMessage', (message) => {
    console.log(`Mensagem ${message}`);
  
    io.emit('serverMessage', `${utils.dateGenerator()} ${socket.id} diz: ${message}`);
  });
});
