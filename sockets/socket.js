module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('message', 'Bem vindo');
  socket.on('disconnect', () => {
    io.emit('serverMessage', { message: 'Saiu da sala' });
  });
});
