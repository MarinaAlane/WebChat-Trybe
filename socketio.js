// tentar implementar isso no futuro -> deve ter outra forma de fazer isso melhor
const OnlineUsers = require('./public/js/onlineUsersServer');

const onlineUsers = OnlineUsers();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('user', socket.id, 'conectou');

    onlineUsers.addUser(socket.id);
    const list = onlineUsers.getList();
    io.emit('render-online-users', list);
    
    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', message);
    })

    socket.on('disconnect', () => {
      onlineUsers.delUser(socket.id)
      io.emit('del-user', socket.id);
      console.log('user', socket.id, 'desconectou');
    });
  });
};
