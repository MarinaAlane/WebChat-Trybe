const { dateGenerator } = require('../helpers/helpers');

module.exports = (io) => {
  io.on('connection', (socket) => {  
    socket.on('message', ({ chatMessage, nickname }) => {
      const nick = nickname;
      const date = dateGenerator();
      io.emit('message', `${date} - ${nick}: ${chatMessage}`);
    });
  
    socket.on('disconnect', () => {
      console.log(`usuário ${socket.id} desconectou`);
    });
  });
};
