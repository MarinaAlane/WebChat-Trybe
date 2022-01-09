const moment = require('moment');

const date = moment().format('MM-DD-YYYY h:mm:ss A');
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`${date} - ${nickname}: ${chatMessage}`);
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('nickname', () => {
    socket.emit('nickname', socket.id);
  });
});