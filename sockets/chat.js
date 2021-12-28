const moment = require('moment');
const Messages = require('../models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment();
    const formattedDate = date.format('DD-MM-yyyy hh:mm:ss A');

    await Messages.create({
      message: chatMessage,
      nickname,
      timestamp: formattedDate,
    });

    io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });
});