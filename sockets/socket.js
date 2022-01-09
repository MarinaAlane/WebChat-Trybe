const moment = require('moment');
const chatController = require('../controllers/chatController');

const timestamp = moment().format('MM-DD-YYYY h:mm:ss A');
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage: message, nickname }) => {
    await chatController.create({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('nickname', () => {
    socket.emit('nickname', socket.id);
  });
});