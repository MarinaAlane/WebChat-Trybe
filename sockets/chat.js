const { getTime } = require('../utils/chat');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();

      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
    });
  });
};