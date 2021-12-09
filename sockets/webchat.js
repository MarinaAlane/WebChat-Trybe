const moment = require('moment');

const ftMsg = moment().format('MM-DD-YYYY h:mm A');
let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
    const userOnline = socket.id.slice(0, 16);
    
    socket.emit('user-connected', userOnline);
  
    socket.on('setNickname', (nickname) => {
      users = users.filter((user) => user.id !== socket.id);
      users.push({ id: socket.id, nickname });
      io.emit('userOnline', users);
    });
  
    socket.on('disconnect', () => {
      users = users.filter((user) => user.id !== socket.id);
      io.emit('userOnline', users);
    });
  
    socket.on('message', (data) => {
      io.emit('message', `${ftMsg} - ${data.nickname}: ${data.chatMessage}`);
    });
  });
};
