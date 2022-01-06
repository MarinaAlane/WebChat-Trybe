const moment = require('moment');

module.exports = (io, socket, onlineUser) => {
    socket.on('message', (message) => {
    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    let nickname = '';

    if (!message.nickname) {
      nickname = onlineUser;
    } else {
      nickname = message.nickname;
    }

    const formatedMessage = `${time} - ${nickname}: ${message.chatMessage}`;
    io.emit('message', formatedMessage);
  });
};
