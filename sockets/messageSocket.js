const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('sendMessage', ({ chatMessage, nickname }) => {
      const date = moment();
      const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

      socket.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    });
  });
};
