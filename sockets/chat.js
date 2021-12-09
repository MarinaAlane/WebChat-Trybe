const dateInform = require('../utils/dateInform');
const { saveMessage } = require('../models/queries');

const date = dateInform();

const connectedUsers = {};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      await saveMessage(message.chatMessage, message.nickname, date);
      if (message.date) {
        return io.emit(
          'message', `${message.date} - ${message.nickname}: ${message.chatMessage}`,
);
      }
      return io.emit(
        'message', `${date} - ${message.nickname}: ${message.chatMessage}`,
);
    });
    socket.on('join', (nickname) => {
      socket.emit('yourId', socket.id);
      connectedUsers[socket.id] = nickname; io.emit('join', connectedUsers);
    });
    socket.on('disconnect', () => {
      delete connectedUsers[socket.id]; io.emit('disconnectedUser', socket.id);
    });
    socket.on('changeNickname', (oldNickname, newNickname) => {
      connectedUsers[socket.id] = newNickname;
      io.emit('changeNickname', oldNickname, newNickname);
    });
  });
