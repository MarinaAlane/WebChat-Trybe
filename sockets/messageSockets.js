// moment usage ref: https://momentjs.com/docs/
const Moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // Code from test req01 => client1.emit('message', { chatMessage, nickname });
    socket.on('message', ({ chatMessage, nickname }) => {
      const moment = Moment();
      const treatedDate = moment.format('DD-MM-yyyy hh:mm:ss A');
      io.emit('message', `${treatedDate} - ${nickname}: ${chatMessage}`);
    });
  });
};