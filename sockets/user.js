module.exports = (io) => io.on('connection', (socket) => {
  const nickname = (socket.id).substr(0, 16);
  socket.emit('generateName', nickname);

  socket.broadcast.emit('login', nickname);

  socket.on('login', (firstLogged) => {
    socket.broadcast.emit('attListUsers', firstLogged);
  });

  socket.on('updateUsername', ({ oldUsername, newUsername }) => {
    socket.broadcast.emit('updateListUsernames', { oldUsername, newUsername });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('dc', nickname);
  });
});
