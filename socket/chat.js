const moment = require('moment');

const users = [];

const newUser = (socket) => {
  users.push({ id: socket.id, nickname: socket.id.substr(0, 16) });
  socket.emit('newUser', socket.id.substr(0, 16));
};

const messageNew = (socket, io) => {
  const date = moment().format('DD-MM-YYYY h:mm:ss A');
socket.on('message', ({ nickname, chatMessage }) => {
  io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
});
};

const settleNickName = (socket, io) => {
  socket.on('saveNick', (newNickName) => {
      users.find((usr) => usr.id === socket.id).nickname = newNickName;
      io.emit('onlineUsers', users);
  });
};

const onlineUsersupdated = (socket, io) => { // emite para todos os usuarios conectados
  socket.on('onlineUsers', () => {
    io.emit('onlineUsers', users);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('servidor conectado');
      messageNew(socket, io);
      newUser(socket);
      settleNickName(socket, io);
      onlineUsersupdated(socket, io);
    });
};
