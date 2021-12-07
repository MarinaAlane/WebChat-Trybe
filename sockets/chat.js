const moment = require('moment');

const users = [];

function sendMessage(io, message) {
  const { chatMessage, nickname } = message;
  const actualTime = moment().format('DD-MM-yyyy HH:mm:ss a');
  io.emit('message', `${actualTime} - ${nickname}: ${chatMessage}`);
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    let nickname = (socket.id).substr(4);
    users.push(nickname);

    socket.emit('user', nickname);

    socket.broadcast.emit('welcomeMessage', nickname);

    socket.on('message', (message) => sendMessage(io, message));

    socket.on('updateUser', ({ username, newUsername }) => {
      nickname = newUsername;
      users[users.indexOf(username)] = newUsername;
      socket.emit('user', newUsername);
      socket.broadcast.emit('changeUserMessage', { username, newUsername });
    });

    socket.on('disconnect', () => {
      users.splice(users.indexOf(nickname));
      socket.broadcast.emit('disconnectMessage', nickname);
    });
  });
};
