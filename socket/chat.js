const moment = require('moment');

const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

const message = ({ chatMessage, nickname }) => `${date} - ${nickname}: ${chatMessage}`;

let users = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário ${socket.handshake.query.nick} conectou`);

  users.push({ id: socket.id, nick: socket.handshake.query.nick });
  io.emit('users', users);
  
  socket.on('message', (data) => {
    io.emit('message', message(data));
  });

  socket.on('users', (name) => {
    const index = users.findIndex(({ id }) => id === socket.id);
    users[index].nick = name;
    socket.broadcast.emit('users', users);
  });

  socket.on('disconnect', () => {
    users = users.filter(({ id }) => id !== socket.id);
    io.emit('users', users);
  });
});