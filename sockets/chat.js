module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} conectado`);
  });
};
