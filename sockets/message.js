const createMessage = require('./helpers/createMessage');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const message = createMessage({ chatMessage, nickname });
    io.emit('message', message);
  });
});
