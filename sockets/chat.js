const { createMessage } = require('../helpers/index');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);
  socket.emit('newUser', 'Olá, seja bem vindo ao nosso chat público!');
  socket.on('message', (message) => {
    console.log(message);
    const data = createMessage();
    io.emit('message', `${data} ${message.nickname}: ${message.chatMessage}`);
  });
});
