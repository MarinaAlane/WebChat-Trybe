const getDate = require('../utils/getDate');

let nick = '';

const handleConnection = (socket) => {
  socket.emit('nickName', nick || socket.id.slice(0, 16));
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
      const date = getDate();
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      console.log('disconectou jovem');
    });
  });
};