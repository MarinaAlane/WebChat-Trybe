const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (message) => {
      const { chatMessage, nickname } = message;
      const actualTime = moment().format('DD-MM-yyyy HH:mm:ss a');
      io.emit('message', `${actualTime} - ${nickname}: ${chatMessage}`);
    });
  });
};
