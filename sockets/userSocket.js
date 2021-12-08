module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('setUsername', socket.id.slice(-16));
  });
};
