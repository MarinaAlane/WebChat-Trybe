const moment = require('moment');
const chatController = require('../controllers/chatController');

const date = moment().format('MM-DD-YYYY h:mm:ss A');
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await chatController.create({ chatMessage, nickname, date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('nickname', () => {
    socket.emit('nickname', socket.id);
  });
});