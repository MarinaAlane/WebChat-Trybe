const moment = require('moment');

const arrId = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('new connection');
    const id = socket.id.substring(0, 16);
    arrId.push(id);
    socket.broadcast.emit('connection', id);
    socket.emit('connection_users', arrId);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const inform = `${date} - ${nickname}: ${chatMessage}`;
      io.emit('message', inform);
    });
  });
};
