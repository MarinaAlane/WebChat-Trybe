const moment = require('moment');
const messagesController = require('../controller/messagesController');

const timestamp = moment().format('MM-DD-YYYY h:mm:ss A');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('message', async ({ chatMessage: message, nickname }) => {
    console.log(`${timestamp} - ${nickname}: ${message}`);
    await messagesController.createMessage({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('generateNickname', () => {
    socket.emit('generateNickname', id);
  });
});
