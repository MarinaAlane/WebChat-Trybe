const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('new connection');
    const id = socket.id.substring(0, 16);
    io.emit('connection', id);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const inform = `${date} - ${nickname}: ${chatMessage}`;
      io.emit('message', inform);
    });
  });
};
