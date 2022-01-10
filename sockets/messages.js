const moment = require('moment');

const formatedDate = moment().format('MM-DD-YYYY h:mm:ss A');

const MessagesIO = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });
};

module.exports = MessagesIO;