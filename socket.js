const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário de ID: ${socket.id} conectado! `);
  const date = moment().format('DD-MM-yyyy hh:mm:ss A');

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${date} - ${nickname}:${chatMessage}`);
  });
});
