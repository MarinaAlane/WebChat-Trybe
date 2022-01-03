const moment = require('moment');
const model = require('../models/message');

module.exports = (io, socket, onlineUser) => {
  io.on('message', async (message) => {
    const cDate = moment().format('DD-MM-YYYY hh:mm:ss A');
    let nickName = '';
    if (!message.nickname) {
      nickName = onlineUser;
    } else {
      nickName = message.nickname;
    }
    
    const editMessage = `${cDate} - ${nickname}: ${message.chatMessage}`
    io.emit('message', editMessage);
  
    const saveMessage = {
      message: message.chatMessage,
      nickname: nickName,
      timeStamp: cDate,
    };

    await model.createMessage(saveMessage);
  });
};
