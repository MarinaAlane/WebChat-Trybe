const getDate = require('../helpers/getDate');

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('serverMessage',
  'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getDate();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});
