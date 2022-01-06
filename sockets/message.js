// moment usage ref: https://momentjs.com/docs/
const Moment = require('moment');
const Message = require('../models/messagesModel');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    // Code from test req01 => client1.emit('message', { chatMessage, nickname });
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = Moment();
      const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');
      await Message.create({
        message: chatMessage,
        nickname,
        timestamp: formatedDate,
      });
      io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    });
    const messages = await Message.getAll();
    socket.emit('savedMsgs', messages);
  });
};