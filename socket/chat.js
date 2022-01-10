const moment = require('moment');
const { getAll, insertOne } = require('../models/messages');

const online = {};
module.exports = (io) => io.on('connection', async (socket) => {
  online[socket.id] = socket.id.substring(0, 16);
  io.emit('newNickname', online);
  const allMessages = await getAll();
  io.emit('allMessages', allMessages);
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-yyyy hh:mm:ss A');
    insertOne({ message: chatMessage, nickname, timeStamp });
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