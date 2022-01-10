const moment = require('moment');

const online = {};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário de ID: ${socket.id} conectado! `);
  const date = moment().format('DD-MM-yyyy hh:mm:ss A');

  const { id } = socket;
  const nicks = id.substring(0, 16);

  online[socket.id] = nicks;
  io.emit('sendNickname', online[socket.id]);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('sendNickname', (nick) => {
    online[socket.id] = nick;
    console.log(nick);
    io.emit('newNickname', online);
  });
});
