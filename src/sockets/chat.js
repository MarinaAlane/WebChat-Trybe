const { getTime } = require('../utils/chat');

let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const id = socket.id.substring(0, 16);

    users.push(id);

    socket.emit('id', users);

    socket.broadcast.emit('newId', id);

    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();

      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      users = users.filter((value) => value !== id);
      socket.broadcast.emit('disconnect_user', id);
    });
  });
};