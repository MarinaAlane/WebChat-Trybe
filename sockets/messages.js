const messageModel = require('../models/messageModel');

const getCurrentDate = () => {
  const date = new Date();
  const day = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return `${day} ${time}`;
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const currentDate = getCurrentDate();
      messageModel.addToMessageHistory({ message: chatMessage, nickname, timestamp: currentDate });
      io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
    });
    const messageHistory = await messageModel.getMessageHistory();
    console.log(messageHistory);
    io.emit('messageHistory', messageHistory);
  });
};