const getDate = require('../utils/getDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('getNickName', socket.id.slice(0, 16));

    socket.on('updateNickName', (nickName) => {
      socket.emit('getNickName', nickName);
    });
  
    socket.on('message', ({ nickname, chatMessage }) => {
      const date = getDate();
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      console.log('disconectou jovem');
    });
  });
};