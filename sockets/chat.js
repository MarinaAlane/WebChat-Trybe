const dateTypo = require('../utils/dateTypo');
const { saveMessage } = require('../models/saveMessages');

const connectedUsers = {};

function handleMessage(message) {
  if (message.date) {
    return `${message.date} - ${message.nickname}: ${message.chatMessage}`;
  }
  return `${dateTypo} - ${message.nickname}: ${message.chatMessage}`;
}

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      await saveMessage(message.chatMessage, message.nickname, dateTypo);
      return io.emit('message', handleMessage(message));
    });
    socket.on('join', (nickname) => {
      socket.emit('yourId', socket.id);
      connectedUsers[socket.id] = nickname;
      io.emit('join', connectedUsers);
    });
    socket.on('disconnect', () => {
      delete connectedUsers[socket.id];
      io.emit('disconnectedUser', socket.id);
    });
    socket.on('changeNickname', (oldNickname, newNickname) => {
      connectedUsers[socket.id] = newNickname;
      io.emit('changeNickname', oldNickname, newNickname);
    });
  });