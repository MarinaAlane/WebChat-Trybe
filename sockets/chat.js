const utils = require('../utils/functions');

let onlineUsers = [];

const sendMessage = async (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = utils.dateGenerator();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('messageServer', 'Coconut Straw: Converse sem grampos - Tecnologia Socket.io.');

  sendMessage(socket, io);

  let userId = (socket.id).substring(0, 16);
  onlineUsers.push(userId);

  socket.broadcast.emit('connection', userId);
  socket.emit('onLineUsers', onlineUsers);

  socket.on('nickname', ({ socketId, nickname }) => {
    userId = nickname;
    onlineUsers = onlineUsers.map((nick) => (nick === socketId ? nickname : nick));
    socket.broadcast.emit('usersUpdate', socketId, nickname);
  });
  
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((nick) => nick !== userId);
    socket.broadcast.emit('users', userId);
  });
});
