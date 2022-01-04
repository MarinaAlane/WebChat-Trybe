// ..Source: https://github.com/tryber/sd-011-project-webchat/blob/luiz-wendel-webchat-project/sockets/userSocket.js
const { createUserName } = require('../middleware/createUserName');

module.exports = (io) => io.on('connection', (socket) => {
  let username = createUserName();
  socket.emit('username', username);

  socket.broadcast.emit('loggedUser', username);

  socket.on('updateUsername', (data) => {
    io.emit('updateUsername', { oldUsername: username, newUsername: data });
    username = data;
  });

  socket.on('loggedUser', (data) => {
    socket.broadcast.emit('addLoggedUsers', data);
  });

  socket.on('disconnect', () => {
    io.emit('removeUser', username);
  });
});
