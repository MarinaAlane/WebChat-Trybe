const { getTime } = require('../utils/chat');
const { createMessage } = require('../models/messages');
const { newOnlineUser, removeUser, updateUser } = require('../utils/chat');

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();
      createMessage(chatMessage, nickname, messageTime);
      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
    });

    socket.on('newOnlineUser', (nickname) => {
      const users = newOnlineUser(nickname);
      io.emit('newOnlineUser', users);
    });

    socket.on('userDisconnect', (nickname) => {
      const users = removeUser(nickname);
      io.emit('userDisconnect', users);
    });

    socket.on('updateNickname', ({ currentNickname, newNickname }) => {
      const users = updateUser(currentNickname, newNickname);
      io.emit('updateNickname', users);
    });
});
