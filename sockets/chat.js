const moment = require('moment');

const messageMoment = moment().format('MM-DD-YYYY h:mm:ss A');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`${messageMoment} - ${nickname}: ${chatMessage}`);
    io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
  });

  socket.on('generateNickname', () => {
    socket.emit('generateNickname', id);
  });
});