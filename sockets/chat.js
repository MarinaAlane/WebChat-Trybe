const currentDate = require('../functions/currentDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = currentDate();

      io.emit('message', `${date} ${nickname}: ${chatMessage}`);
    });
  });
};