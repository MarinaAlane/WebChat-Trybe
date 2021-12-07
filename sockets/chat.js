const moment = require('moment');
const MessagesModel = require('../models/Messages');

const users = [];

async function sendMessage(io, message) {
  const { chatMessage, nickname } = message;
  const actualTime = moment().format('DD-MM-yyyy HH:mm:ss a');
  await MessagesModel.create(chatMessage, nickname, actualTime);
  io.emit('message', `${actualTime} - ${nickname}: ${chatMessage}`);
}

function updateUser(socket, { username, newUsername }) {
  users[users.indexOf(username)] = newUsername;
  socket.emit('user', newUsername);
  socket.broadcast.emit('changeUserMessage', { username, newUsername });
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    let nickname = (socket.id).substr(4);
    users.push(nickname);

    socket.emit('user', nickname);

    io.emit('renderUsers', users);

    socket.broadcast.emit('welcomeMessage', nickname);

    socket.on('message', (message) => sendMessage(io, message));

    socket.on('updateUser', (userData) => {
      nickname = userData.newUsername;
      updateUser(socket, userData);
      io.emit('renderUsers', users);
    });

    socket.on('disconnect', () => {
      users.splice(users.indexOf(nickname), 1);
      socket.broadcast.emit('disconnectMessage', nickname);
      io.emit('renderUsers', users);
    });
  });
};
