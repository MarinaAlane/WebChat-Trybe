const moment = require('moment');

const atualDate = moment(new Date()).format('DD-MM-yyyy h:mm:ss a');

const message = ({ chatMessage, nickname }) =>
  `${atualDate} ${nickname}: ${chatMessage}`;

module.exports = (io) =>
  io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', message({ chatMessage, nickname }));
  });
});