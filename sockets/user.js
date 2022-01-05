module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', async () => {
    io.emit('user', console.log('aqui'));
  });
});