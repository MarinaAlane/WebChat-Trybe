const getDateTime = require('../utils/dateTime');
const { changeNickname, createUser, insertMessage, removeUser } = require('../utils/chat');
const { saveMessage } = require('../models/messages');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const timestamp = getDateTime();
      insertMessage(`${timestamp} - ${nickname}: ${chatMessage}`);
      saveMessage({ message: chatMessage, nickname, timestamp });
      io.emit('message', `${getDateTime()} - ${nickname}: ${chatMessage}`);
    });

    socket.on('createUser', ({ nickname }) => {
      io.emit('changeNickname', createUser(socket, nickname));
    });

    socket.on('changeNickname', ({ currentNickname, nickname }) => {
      io.emit('changeNickname', changeNickname(socket, currentNickname, nickname));
    });

    socket.on('disconnect', () => {
      io.emit('changeNickname', removeUser(socket));
    });
  });
};
