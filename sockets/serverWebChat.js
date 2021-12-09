const { format } = require('date-fns');
const updateNickname = require('../utils/updateNickname');

let usersOnline = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLoggedIn', (randomNickname) => {
    usersOnline.push({ randomNickname, id: socket.id });
    io.emit('userLoggedIn', usersOnline);
  });
  socket.on('newNickName', (user) => {
    usersOnline = updateNickname(usersOnline, user.newNickname, user.oldNickname);
    io.emit('newNickName', usersOnline);
  });
  socket.on('message', (clientMessage) => {
    const { chatMessage, nickname } = clientMessage;
    io.emit('message', `${format(new Date(), 'dd-MM-yyyy HH:mm:ss')} ${nickname} ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    usersOnline = usersOnline.filter((user) => user.id !== socket.id);
    socket.broadcast.emit('userLoggedIn', usersOnline);
  });
});
