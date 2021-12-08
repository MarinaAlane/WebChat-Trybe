module.exports = (io) => {
  io.on('connection', (socket) => {
    let username = socket.id.slice(-16);

    socket.emit('setUsername', username);

    socket.broadcast.emit('addLoggedUser', username);

    socket.on('addLoggedUser', (data) => {
      socket.broadcast.emit('addMissingLoggedUser', data);
    });

    socket.on('updateUsername', (data) => {
      io.emit('updateUsername', { oldUsername: username, newUsername: data });
      username = data;
    });

    socket.on('disconnect', () => {
      io.emit('removeUser', username);
    });
  });
};
