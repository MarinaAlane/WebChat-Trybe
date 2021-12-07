const { format } = require('date-fns');

module.exports = (io) => io.on('connection', (socket) => {
  const randomNickname = socket.id.slice(0, -4);
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss'); 

  socket.emit('userLoggedIn', randomNickname);
 
  socket.on('message', (clientMessage) => {
    const { chatMessage, nickname } = clientMessage;
    io.emit('message', `${timestamp} ${nickname} ${chatMessage}`);
  });

  // socket.on('nickName', (message) => {
  //   io.emit('userList', message);
  // });
});