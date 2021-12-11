const formatDate = (date) => {
  let day = date.toISOString().split('T')[0].split('-');
  day = [day[2], day[1], day[0]].join('-');
  const hour = date.toLocaleTimeString('en-US');
  return `${day} ${hour}`;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('enterChat');

    socket.on('addOnlineUser', (user) => {
      io.emit('addOnlineUser', user);
    });

    socket.on('updateNickname', ({ user, newNickname }) => {
      io.emit('updateNickname', { user, newNickname });
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${formatDate(new Date(Date.now()))} - ${nickname}: ${chatMessage}`);
    });

    // socket.on('disconnect', () => {
    //   socket.broadcast.emit('removeUser', user);
    // });
  });  
};
