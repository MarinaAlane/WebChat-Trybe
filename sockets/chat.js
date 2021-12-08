const { getTime } = require('../utils/chat');
const { createMessage } = require('../models/messages');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageTime = getTime();
      createMessage(chatMessage, nickname, messageTime);
      io.emit('message', `${messageTime} - ${nickname}: ${chatMessage}`);
    });
  });
};