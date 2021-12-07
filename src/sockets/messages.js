const getCurrentDate = require('../utils/getCurrentDate');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getCurrentDate('pt-BR');
    const message = `${date} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});
