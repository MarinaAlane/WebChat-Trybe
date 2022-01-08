module.exports = (io) => {
  io.on('connection', (socket) => {
  console.log(`Novo usuario conectado: ${socket.id}`);
    const userNick = (socket.id).slice(0, 16);

  socket.on('nickname', () => {
    socket.emit('nickname', userNick);
  });

  socket.on('signIn', () => {
    io.emit('signIn', userNick);
  });

  socket.on('loggedUsers', (loggedUser) => {
    socket.broadcast.emit('loggedUsers', loggedUser);
  });
  });
};