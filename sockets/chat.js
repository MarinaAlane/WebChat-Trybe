const utils = require('../utils/functions');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('messageServer', 'Coconut Straw diz: Converse sem grampos - Tecnologia Socket.io.');

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = utils.dateGenerator();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});
