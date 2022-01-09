const moment = require('moment');

const online = {};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  const { id } = socket;
  const nicks = id.substring(0, 16);

  online[socket.id] = nicks;
  io.emit('sendNickname', online[socket.id]);

  const dateFormat = moment().format('DD-MM-yyyy hh:mm:ss A');

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${dateFormat} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('sendNickname', (nick) => {
    online[socket.id] = nick;
    console.log(nick);
    io.emit('newNickname', online);
  });
});