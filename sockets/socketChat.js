const moment = require('moment');

const time = moment().format('DD-MM-YYYY hh:mm:ss A');

module.exports = (io) =>
  io.on('connection', (socket) => {
    // console.log(socket);
    socket.on('sendMessage', (message) => {
      const formatMessage = {
        time,
        message,
      };
      console.log(formatMessage);
      socket.emit('resMessage', formatMessage);
    });
  });
