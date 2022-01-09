module.exports = (io) => {
  io.on('connection', (socket) => {
    let userNick = (socket.id).slice(0, 16);
    socket.on('nickname', () => { socket.emit('nickname', userNick); });
    socket.on('signIn', () => { io.emit('signIn', userNick); });
    socket.on('updateNick', (oldNick, newNick) => {
      io.emit('updateNick', oldNick, newNick);
      userNick = newNick;
    });
    socket.on('callUpdateUsers', () => {
      const socketId = (socket.id);
      socket.broadcast.emit('updateUsers', socketId);
    });
    socket.on('getUsers', (socketId, user) => { io.to(socketId).emit('getUsers', user); });
    socket.on('disconnect', () => {
      socket.broadcast.emit('removeUser', (userNick));
    });
  });
};