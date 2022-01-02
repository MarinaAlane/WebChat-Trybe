let users = [];
module.exports = (io) => io.on('connection', (socket) => {
  users = [{ id: socket.id, username: socket.id.substring(0, 16) }, ...users];
  socket.emit('users', users);
  socket.broadcast.emit('username', { id: socket.id, username: socket.id.substring(0, 16) });
  socket.on('editUser', ({ id, username }) => {
    users = users.map((user) => { if (user.id === id) return { id, username }; return user; });
    io.emit('editUser', { id, username });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnectUser', socket.id);
    users = users.filter(({ id }) => id !== socket.id);
  });
});