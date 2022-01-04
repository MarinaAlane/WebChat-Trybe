const getDate = require('../utils/getDate');
const { newMessage } = require('../models/messages');

const users = {};

const handleConnection = (socket, io) => {
  const randomNickName = socket.id.slice(0, 16);
  socket.emit('getNickName', randomNickName);

  users[socket.id] = randomNickName.toString();
  io.emit('onlineUsers', users);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    handleConnection(socket, io);
    console.log(users);

    socket.on('updateNickName', (nickName) => {
      socket.emit('getNickName', nickName);
      users[socket.id] = nickName;
      io.emit('onlineUsers', users);
    });
  
    socket.on('message', ({ nickname, chatMessage }) => {
      const date = getDate();
      newMessage({ message: chatMessage, nickname, timestamp: date });
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('onlineUsers', users);
    });
  });
};