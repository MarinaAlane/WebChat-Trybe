const moment = require('moment');
const messageModel = require('../models/messageModel');

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

    const createdMessage = {
      message: message.chatMessage,
      nickname: nickName,
      timestamp: time,
    };

    await messageModel.createMessage(createdMessage);
  });
};
