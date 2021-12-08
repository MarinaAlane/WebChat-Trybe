const moment = require('moment');
const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = moment();
      const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

      await Message.create({
        message: chatMessage,
        nickname,
        timestamp: formatedDate,
      });

      io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    });
  });
};
