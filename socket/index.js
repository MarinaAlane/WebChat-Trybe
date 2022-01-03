let nick = '';

const handleConnection = (socket) => {
  socket.emit('nickName', `${nick || socket.id.slice(0, 16)}`);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    handleConnection(socket);

    socket.on('nickName', (nickName) => {
      nick = nickName;
      socket.emit('nickName', nickName);
    });
  
    socket.on('message', ({ nickname, chatMessage }) => {
      console.log(nickname, chatMessage);
      const date = new Date();
      const hour = date.toLocaleTimeString();
      const dateFormated = date.toISOString().split('T')[0].split('-').reverse().join('-');
      const completeDate = `${dateFormated} ${hour}`;
      socket.broadcast.emit('message', `${completeDate} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      console.log('disconectou jovem');
    });
  });
};