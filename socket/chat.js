const moment = require('moment');

const date = moment().format('DD-MM-YYYY h:mm:ss A');

const messageNew = (socket, io) => {
socket.on('message', ({ nickname, chatMessage }) => {
  io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
});
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('servidor conectado');
      messageNew(socket, io);
    });
};
