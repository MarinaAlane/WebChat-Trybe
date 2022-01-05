const moment = require('moment');
const Chat = require('../models/Chat');

const currentDate = moment().format('DD-MM-yyyy HH:mm:ss A');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await Chat.createNewMessage({ message: chatMessage, nickname, timestamp: currentDate });
    io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
  });
});