module.exports = (io) => {
  io.on('connection', (socket) => {
    const username = socket.id.slice(-16);

    socket.emit('setUsername', username);

    socket.broadcast.emit('addLoggedUser', username);
  });
};
