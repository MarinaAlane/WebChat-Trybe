const utils = require('../utils/functions');

const onlineUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('messageServer', 'Coconut Straw: Converse sem grampos - Tecnologia Socket.io.');

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = utils.dateGenerator();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('onLineUsers', (user) => {
    onlineUsers.push(user);
    console.log(onlineUsers);
    io.emit('onLineUsers', onlineUsers);
  });

  socket.on('disconnect', () => {
    const index = onlineUsers.indexOf(socket.id);
    if (index > -1) {
      onlineUsers.splice(index, 1);
    }
    io.emit('onLineUsers', onlineUsers);
  });
});
