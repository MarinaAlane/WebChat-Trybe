const { getTime } = require('../utils/chat');

const users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const id = socket.id.substring(0, 16);

    users.push(id);

    socket.emit('id', users);

    socket.emit('connectUsers', users);

    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();

      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
    });
  });
};