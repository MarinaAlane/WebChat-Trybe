const moment = require('moment');

module.exports = (io, socket, onlineUser) => {
  socket.on('message', (message) => {
    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    let nickName = '';
    if (!message.nickname) {
      nickName = onlineUser;
    } else {
      nickName = message.nickname;
    }

    const formatedMessage = `${time} - ${nickName}: ${message.chatMessage}`;
    io.emit('message', formatedMessage);
  });
};
