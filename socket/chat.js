const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);
  
  const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

  const message = ({ chatMessage, nickname }) =>
  `${date} - ${nickname}: ${chatMessage}`;
  
  socket.on('message', (data) => {
    io.emit('message', message(data));
  });

  socket.on('disconnect', () => console.log(`Usuário ${socket.id} desconectou`));
});