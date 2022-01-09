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
      socket.broadcast.emit('updateUsers', (socket.id));
    });
    socket.on('getUsers', (socketId, user) => { 
      if (user !== 'A1jeTLlvU4zDOdIC') { io.to(socketId).emit('getUsers', user); }
    });
    socket.on('disconnect', () => { socket.broadcast.emit('removeUser', (userNick)); });
  });
};