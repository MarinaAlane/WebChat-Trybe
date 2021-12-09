const { format } = require('date-fns');

let usersOnline = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLoggedIn', (message) => {
    usersOnline.push(message);
    io.emit('userLoggedIn', usersOnline); // emitindo para os outros usuários
  });
  socket.on('newNickName', (message) => {
    const { newNickname, oldNickname } = message;
    usersOnline.splice(usersOnline.indexOf(oldNickname), 1, newNickname);
    io.emit('newNickName', usersOnline);
  });
  socket.on('message', (clientMessage) => {
    const { chatMessage, nickname } = clientMessage;
    io.emit('message', `${format(new Date(), 'dd-MM-yyyy HH:mm:ss')} ${nickname} ${chatMessage}`);
  });
  socket.on('end', (message) => {
    usersOnline = usersOnline.filter((user) => user !== message);
    socket.broadcast.emit('userLoggedIn', usersOnline);
  });
});