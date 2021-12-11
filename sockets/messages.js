const moment = require('moment');
const model = require('../models/messages');

module.exports = (io, socket, onlineUser) => {
  socket.on('message', async (message) => {
    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    let nickName = '';
    if (!message.nickname) {
      nickName = onlineUser;
    } else {
      nickName = message.nickname;
    }

    const formatedMessage = `${time} - ${nickName}: ${message.chatMessage}`;
    io.emit('message', formatedMessage);

    const dbMessage = {
      message: message.chatMessage,
      nickname: nickName,
      timestamp: time,
    };

    await model.createMessage(dbMessage);
  });
};
