const moment = require('moment');
const chatModel = require('./models/chatModel');

const online = {};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário de ID: ${socket.id} conectado! `);
  
  const { id } = socket;
  const nicks = id.substring(0, 16);

  online[socket.id] = nicks;
  io.emit('sendNickname', online[socket.id]);
  
  const allMessages = await chatModel.listMessages();
  io.emit('allMessages', allMessages);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-yyyy hh:mm:ss A');
    chatModel.createMessage({ message: chatMessage, nickname, date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('sendNickname', (nick) => {
    online[socket.id] = nick;
    console.log(nick);
    io.emit('newNickname', online);
  });
});
