const moment = require('moment');
const msgModel = require('../models/messages');

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

    const dbMsg = {
      message: message.chatMessage,
      nickname: nickName,
      timestamp: time,
    };

    await msgModel.insertMessage(dbMsg);
  });
};
