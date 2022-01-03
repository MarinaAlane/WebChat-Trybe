const axios = require('axios');
const { getTime } = require('../utils/chat');

let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    let id = socket.id.substring(0, 16); users.push(id);

    socket.emit('id', users); socket.broadcast.emit('newId', id);

    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();
      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
      axios.post('http://localhost:3000',
      { message: chatMessage, nickname, timestamp: messageTime });
    });

    socket.on('change_user', ({ newUser, oldUser }) => {
      id = newUser; users = users.map((user) => (user === oldUser ? newUser : user));
      socket.broadcast.emit('update_user', newUser, oldUser);
    });

    socket.on('disconnect', () => {
      users = users.filter((value) => value !== id);
      socket.broadcast.emit('disconnect_user', id);
    });
  });
};
