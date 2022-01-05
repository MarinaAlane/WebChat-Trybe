const currentDate = require('../functions/currentDate');
const {
  createNewMessage,
} = require('../controllers/chatController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = currentDate();
      
      createNewMessage(chatMessage, nickname, date);
      
      io.emit('message', `${date} ${nickname}: ${chatMessage}`);
    });
  });

  io.on('connection', (socket) => {
    socket.on('newUser', (user) => {
      io.emit('newUser', user);
    });
  });
};