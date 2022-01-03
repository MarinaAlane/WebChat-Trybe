const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  // socket.broadcast.emit('hello', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);
  console.log(`Usuário ${socket.id} acabou de se conectar`);

  socket.on('message', ({ nickname, chatMessage }) => {
    console.log(`Mensagem ${chatMessage}`);
    io.emit('serverMessage', 
      `${moment().format('DD-MM-yyyy HH:mm:ss A')} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newNickname', (nickname) => {
    console.log(`Nickname: ${nickname}`);
    io.emit('serverNick', nickname);
  });

  socket.on('disconnect', () => {
    // socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
    console.log(`Usuário ${socket.id} acabou de se desconectar`);
  });
});