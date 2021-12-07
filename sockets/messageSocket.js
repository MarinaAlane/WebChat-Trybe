const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = moment();
      const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

      io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    });
  });
};
