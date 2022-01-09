const moment = require('moment');

const date = moment().format('MM-DD-YYYY h:mm:ss A');
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ message, nickname }) => {
    console.log(`${date} - ${nickname}: ${message}`);
    io.emit('message', `${date} - ${nickname}: ${message}`);
  });
});