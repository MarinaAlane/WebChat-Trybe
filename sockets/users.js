module.exports = (io) => io.on('connection', (socket) => {
  let nickname = (socket.id).substr(4);
  socket.broadcast.emit('serverMessage', `${nickname} acabou de se conectar`);
  io.emit('newUser', nickname);

  // socket.on('getNickname', () => {
  //   socket.emit('nickname', nickname);
  // });

  socket.on('usersListFromClient', (usersList) => {
    io.emit('listWithAllUsers', usersList);
  });

  socket.on('updateNickname', (newNickname) => {
    socket.broadcast.emit('updateNickname', { previusNickname: nickname, newNickname });
    nickname = newNickname;
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `${nickname} acabou de se desconectar!`);
    socket.broadcast.emit('removeNickname', nickname);
  });
});
