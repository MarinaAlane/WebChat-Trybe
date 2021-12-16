const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (message) => { // ouvindo a mensagem enviada pelos usuários
      const formatDate = moment().format('DD-MM-yyyy hh:mm:ss A');
      const formatMessage = `${formatDate} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', formatMessage); // io.emit está emitindo a mensagem formatada pra todos os usuários
    });
  });
};
