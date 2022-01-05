module.exports = (io) => io.on('connection', (socket) => {
  socket.on('user', (user) => {
    console.log(`Olá: ${user}`);
    console.log(`${socket.id}`);
    io.emit('serveruser', user);
  });
});