const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} acabou de se conectar`);

  socket.on('message', ({ nickname, chatMessage }) => {
    console.log(`Mensagem ${chatMessage}`);
    io.emit('message', 
      `${moment().format('DD-MM-yyyy HH:mm:ss A')} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newNickname', (nickname) => {
    console.log(`Nickname: ${nickname}`);
    io.emit('serverNick', nickname);
  });

  socket.on('connect', (id) => {
    console.log(`Nickname ranodm: ${socket.id}`);
    io.emit('connect', id);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} acabou de se desconectar`);
  });
});