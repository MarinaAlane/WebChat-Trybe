const moment = require('moment');
const dbModel = require('./models/dbModel');

const online = {};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  online[socket.id] = socket.id.substring(0, 16);
  io.emit('newNickname', online);
  
  const allMessages = await dbModel.listMessage();
  io.emit('allMessages', allMessages);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-yyyy hh:mm:ss A');
    dbModel.createMessage({ message: chatMessage, nickname, timeStamp });
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
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