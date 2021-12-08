const getBrazilianDate = require('../utils/getBrazilianDate');

const formatedUser = (data) => `${getBrazilianDate()} - ${data.nickname}: ${data.chatMessage}`;

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Alguém com ID ${socket.id} conectou`);
  
  socket.on('message', (data) => {
    io.emit('message', formatedUser(data));
  });

  socket.on('disconnect', () => console.log(`${socket.id} saiu`));
});