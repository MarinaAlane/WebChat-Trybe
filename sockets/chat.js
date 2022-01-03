const model = require('../models/message');
const moment = require('moment');

const userList = [];

module.exports = (io, socket, onlineUser) => {
  socket.on('message', async (message) => {
    const cDate = moment().format('DD-MM-YYYY hh:mm:ss A');
    let nickName = '';
    if (!message.nickname) {
      nickName = onlineUser;
    } else {
      nickName = message.nickname
    }
    
    const editMessage = `${timeStamp} - ${nickname}: ${message.chatMessage}`
    io.emit('message', editMessage);
  
    const saveMessage = {
      message: message.chatMessage, nickname: nickName,
      timeStamp: timeStamp,
    };

    await model.createMessage(saveMessage);
});