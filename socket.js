// conexão aberta com o back-end
const moment = require('moment');
const onLineUsers = {};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  const { id } = socket;
  const nickname = id.substring(0, 16);
  
  onLineUsers[socket.id] = nickname;
  io.emit('sendNickName', onLineUsers[socket.id]);

  const dateFormat = moment().format('DD-MM-yyyy hh:mm:ss A');

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', ` ${dateFormat} - ${onLineUsers[nickname]}: ${chatMessage}`); 
  });

  socket.on('sendNickName', (nick) => {
    onLineUsers[socket.id] = nick;
    io.emit('newNickName', onLineUsers)
  });
});
