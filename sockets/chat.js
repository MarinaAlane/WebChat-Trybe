const chat = (io) => {
  io.on('connection', (socket) => {
    console.log(`Um usuário conectou em ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Um usuário desconectou em ${socket.id}`);
    });

    socket.on('message', (message) => {
      const dateMessage = new Date();
      const timeMessage = dateMessage.toLocaleTimeString();
      const formattedDateMessage = dateMessage.toLocaleDateString().replaceAll('/', '-');
      const formattedMessage = `${formattedDateMessage} ${timeMessage}
      -${message.nickname}: ${message.chatMessage}`;

      io.emit('message', formattedMessage);
      console.log(dateMessage, timeMessage, formattedDateMessage, formattedMessage);
    });
  });
};

module.exports = chat;
