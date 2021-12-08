const users = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', (nickname) => {
    users.push({ nickname, id: socket.id });
    io.emit('user', users);
  });

  socket.on('changeUsername', (newNickname) => {
    const index = users.findIndex((user) => user.id === socket.id);
    users.splice(index, 1, { nickname: newNickname, id: socket.id });
    io.emit('user', users);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    users.splice(index, 1);
    socket.broadcast.emit('user', users);
  });
});