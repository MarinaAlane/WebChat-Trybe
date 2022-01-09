const moment = require('moment');

const msgSend = (io, socket) => {
    const timestamp = moment().format('DD-MM-YY h:mm:ss A');
    socket.on('message', ({ nickname, chatMessage }) => {
      io.emit('message', `${timestamp} ${nickname} ${chatMessage}`);      
    });
};

module.exports = (io) => {
    io.on('connection', (socket) => {
        msgSend(socket, io);
      });
    };