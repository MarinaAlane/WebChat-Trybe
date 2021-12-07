const moment = require('moment');

const connect = (io) => {
  io.on('connection', (socket) => {
    socket.emit('ping');
    console.log('cliente conectado');

    socket.on('pong', () => {
      console.log('pong recebido');
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
      const message = `${timestamp} - ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};

module.exports = { chat: { connect } };
