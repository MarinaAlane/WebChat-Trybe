const users = {};

const randomUserGenerate = (socket, io) => {
  const randomNick = socket.id.split('', 16).join('');
  socket.emit('getNick', randomNick);
  users[socket.id] = randomNick;
  io.emit('usersOnline', users);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    randomUserGenerate(socket, io);

    socket.on('newNickname', (nickName) => {
      socket.emit('getNick', nickName);
      users[socket.id] = nickName;
      io.emit('usersOnline', users);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('usersOnline', users);
    });
  });
};
