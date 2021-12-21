const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('sendMessage', ({ chatMessage, nickname }) => {
    const date = moment();
    const formattedDate = date.format('DD-MM-yyyy hh:mm:ss A');

    socket.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });
});