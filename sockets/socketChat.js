const moment = require('moment');

const time = moment().format('DD-MM-YYYY hh:mm:ss A');

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      const formatMessage = `${time} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', formatMessage);
    });
  });
