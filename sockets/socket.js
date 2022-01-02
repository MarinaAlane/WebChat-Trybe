const { userJoin, updateUser, getAllUsers, removeOne, getUserById } = require('../triggers/user');

module.exports = (io) => io.on('connection', (socket) => {
  const user = userJoin(socket.id.substr(1, 16), '');
  
  io.emit('userServer', { users: getAllUsers() });
  io.emit('serverName', { message: getAllUsers() });

  socket.emit('message', `Bem vindo(a) ${user.id}`);
  // socket.broadcast.emit('serverMessage', { message: `${user.id} entrou na sala!` });
   
  socket.on('messages', (msg) => {
    io.emit('serverMessage', { chatMessage: msg, nickname: user.nickname });
  });

  socket.on('name', (name) => {
    removeOne(socket.id.substr(1, 16));
    io.emit('serverName', { message: updateUser(socket.id.substr(1, 16), name) });
    io.emit('userServer', { users: getAllUsers() });
  });

  socket.on('disconnect', () => {
    const exiting = getUserById(socket.id.substr(1, 16));
    io.emit('serverMessage', { message: `${exiting.nickname} saiu da sala` });
    removeOne(socket.id.substr(1, 16));
    io.emit('userServer', { users: getAllUsers() });
  });
});
