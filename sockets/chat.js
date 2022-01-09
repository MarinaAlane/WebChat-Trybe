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

    socket.on('createUser', ({ currentName }) => {
      io.emit('changeNickname', createUser(socket, currentName));
    });

    socket.on('changeNickname', ({ originalNickname, nickname }) => {
      io.emit('changeNickname', changeNickname(socket, originalNickname, nickname));
    });

    socket.on('disconnect', () => {
      io.emit('changeNickname', removeUser(socket));
    });
  });
};
