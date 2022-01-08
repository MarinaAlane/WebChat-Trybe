const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  const dateFormat = moment().format('DD-MM-yyyy hh:mm:ss A');
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${dateFormat} - ${nickname}:${chatMessage}`);
  });
});