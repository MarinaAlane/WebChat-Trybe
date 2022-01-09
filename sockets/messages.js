const moment = require('moment');

module.exports = (io, socket) => {
    socket.on('message', (message) => {
    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    const formatedMessage = `${time} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', formatedMessage);
  });
}; 
