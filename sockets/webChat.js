const { format } = require('date-fns');

module.exports = (io) => io.on('connection', (socket) => {
  const randomNickname = socket.id.slice(0, -4);

  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

  io.emit('userLoggedIn', randomNickname);

  socket.on('newNickName', (message) => {
    console.log(message);
    io.emit('newNickName', message);
  });

  socket.on('message', (clientMessage) => {
    const { chatMessage, nickname } = clientMessage;
    io.emit('message', `${timestamp} ${nickname} ${chatMessage}`);
  });
});