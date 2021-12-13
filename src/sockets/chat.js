const moment = require('moment');

let arrId = [];

const setMessage = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
    const inform = `${date} - ${nickname}: ${chatMessage}`;
    io.emit('message', inform);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    let id = socket.id.substring(0, 16);
    arrId.push(id);
    socket.broadcast.emit('connection', id);
    socket.emit('connection_users', arrId);
    socket.on('alterUsername', ({ oldNickName, userNickname }) => {
      id = userNickname;
      arrId = arrId.map((value) => (value === oldNickName ? userNickname : value));
      socket.broadcast.emit('updateUsers', oldNickName, userNickname);
    });

    socket.on('disconnect', () => {
      arrId = arrId.filter((value) => value !== id);
      socket.broadcast.emit('disconnect_user', id);
    });

    setMessage(socket, io);
  });
};
