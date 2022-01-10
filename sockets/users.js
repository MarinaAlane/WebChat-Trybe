const users = {};

module.exports = (io) =>
  io.on('connection', async (socket) => {
  // console.log(`Usuário ${socket.id} conectado`);

// socket.emit('welcomeMessage', ('Olá, bem vindos!'));

  socket.on('updateUsername', (nickName) => {
    io.emit('updateUsername', nickName);
    // console.log({nickName});
    users[socket.id] = nickName;
    // console.log({ users });
    io.emit('usersOnline', users);
  });
  
  socket.on('disconnect', () => {
    // console.log(`Usuário ${socket.id} saiuuu!`);
    delete users[socket.id];
    io.emit('usersOnline', users);
  });
});