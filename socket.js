const moment = require('moment');
const chatModel = require('./models/chatModel');

const online = {};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário de ID: ${socket.id} conectado! `);
  
  online[socket.id] = socket.id.substring(0, 16);
  io.emit('newNickname', online);
  
  const allMessages = await chatModel.listMessages();
  io.emit('allMessages', allMessages);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-yyyy hh:mm:ss A');
    chatModel.createMessage({ message: chatMessage, nickname, date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('disconnect', () => {
    delete online[socket.id];
    io.emit('newNickname', online);
  });

  socket.on('sendNickname', (nick) => {
    online[socket.id] = nick;
    io.emit('newNickname', online);
  });
});
