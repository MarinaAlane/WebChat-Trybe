const fns = require('date-fns');

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', ({ nickname, chatMessage }) => {
      const date = new Date();
      const formattedDate = fns.format(date, 'dd-MM-yyyy HH:mm:ss');
      io.emit('message', ` ${formattedDate} - ${nickname}: ${chatMessage}`);
    });
  });
