const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);
  const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
  
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    console.log('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => console.log(`Usuário ${socket.id} desconectou`));
});