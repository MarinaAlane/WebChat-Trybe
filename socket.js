const moment = require('moment');
const dbModel = require('./models/dbModel');

const online = {};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  const { id } = socket;
  const nicks = id.substring(0, 16);

  online[socket.id] = nicks;
  io.emit('sendNickname', online[socket.id]);

  const allMessages = await dbModel.listMessage();
  io.emit('allMessages', allMessages);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-yyyy hh:mm:ss A');
    dbModel.createMessage({ message: chatMessage, nickname, timeStamp });
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('sendNickname', (nick) => {
    online[socket.id] = nick;
    console.log(nick);
    io.emit('newNickname', online);
  });
});