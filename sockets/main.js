const fortmatedDate = require('../utils/formatedDate');

const formatedMessage = ({ nickname, chatMessage }) =>
  `${fortmatedDate()} - ${nickname}: ${chatMessage}`;

module.exports = (io) =>
  io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', formatedMessage(data));
  });

  // Listen for disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
