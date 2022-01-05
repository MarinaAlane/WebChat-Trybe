module.exports = (io) => io.on('connection', (socket) => {
  let nickname = socket.id.substr(1, 16);
  io.emit('serverUser', nickname);

  socket.on('userListFromClient', (userList) => {
    io.emit('serverAllUsers', userList);
  });

  socket.on('serverUpdateNickname', (newNickname) => {
    socket.broadcast.emit('serverUpdateNickname',
      { previewNickname: nickname, nickname: newNickname });
    nickname = newNickname;
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `${nickname} saiu da sala!`);
    socket.broadcast.emit('serverRemoveUser', nickname);
  });
});
