const connect = (io) => {
  io.on('connection', (socket) => {
    socket.emit('ping');
    console.log('cliente conectado');

    socket.on('pong', () => {
      console.log('pong recebido');
    });
  });
};

module.exports = { chat: { connect } };
