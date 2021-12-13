module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    socket.on('ping', () => {
      console.log('cliente conectado');
    });
  });
};
