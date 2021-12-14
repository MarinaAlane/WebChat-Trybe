const { newDate } = require('../structures/structures');

const arrNickNames = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log(`usuário ${socket.id} conectou`);
  
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${newDate()} - ${nickname}: ${chatMessage}`);
    });

    socket.on('new-client', (generateNickName) => {
      const { nickname } = generateNickName;
      arrNickNames.push({ nickname, id: nickname });
      io.emit('new-login', { arrNickNames, nickname });
    });
  
    socket.on('disconnect', () => {
      // console.log(`usuário ${socket.id} desconectou`);
    });
  });
};
