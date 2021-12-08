const userMessageFormatter = require('../utils/userMessageFormatter');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  io.emit('userConnected', socket.id);
  
  socket.on('message', ({ nickname, chatMessage }) => {
    console.log(nickname, chatMessage);
    io.emit('message', userMessageFormatter(nickname, chatMessage));
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} desconectou`);
  });
  
  // socket.on('changeNickname', (newNickname) => {
  //   nickname = newNickname;
  // });
});
