const getDate = require('../utils/getDate');

const handleConnection = (socket) => {
  socket.emit('getNickName', socket.id.slice(0, 16));
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    handleConnection(socket);

    socket.on('updateNickName', (nickName) => {
      socket.emit('getNickName', nickName);
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