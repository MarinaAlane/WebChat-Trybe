const moment = require('moment');
const SaveMessage = require('../models/SaveMessage');

const ftMsg = moment().format('MM-DD-YYYY h:mm:ss');
let users = [];

async function historyMessage(socket) {
  const getMessage = new SaveMessage();
  const messages = await getMessage.getMessages();
  socket.emit('historyMessage', messages);
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    const userOnline = socket.id.slice(0, 16);
    
    socket.emit('user-connected', userOnline);
  
    socket.on('setNickname', (nickname) => {
      users = users.filter((user) => user.id !== socket.id);
      users.push({ id: socket.id, nickname }); io.emit('userOnline', users);
    });
  
    socket.on('disconnect', () => {
      users = users.filter((user) => user.id !== socket.id); io.emit('userOnline', users);
    });

    socket.on('message', (data) => {
      io.emit('message', `${ftMsg} - ${data.nickname}: ${data.chatMessage}`);
      const messageObj = { message: data.chatMessage, nickname: data.nickname, timestamp: ftMsg };
      const newMessage = new SaveMessage(messageObj);
      newMessage.saveMessages();
    });
    historyMessage(socket);
  });
};
