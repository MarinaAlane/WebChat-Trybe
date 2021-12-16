const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    const newId = id.substr(0, 16);

    socket.on('message', (message) => { // Req. 1 - ouvindo a mensagem enviada pelos usuários
      const formatDate = moment().format('DD-MM-yyyy hh:mm:ss A');
      const formatMessage = `${formatDate} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', formatMessage); // io.emit está emitindo a mensagem formatada pra todos os usuários
    });
    io.emit('newUser', newId); // Req. 2 - emitindo para todos os usuários, o novo logado no chat
  });
};
