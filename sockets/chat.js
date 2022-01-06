const service = require('../services/message');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage: message, nickname }) => {
    const timestamp = new Date().toLocaleString('pt-BR').replaceAll('/', '-').replaceAll(',', '');
    await service.addMessage({ message, nickname, timestamp });

    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });
});
