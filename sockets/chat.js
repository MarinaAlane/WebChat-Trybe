const userMessageFormatter = require('../utils/userMessageFormatter');

let usersOnline = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  const userNickname = socket.id.slice(0, 16);

  usersOnline.push(userNickname);
  console.log(usersOnline);
  io.emit('userConnected', { usersOnline, userNickname });
  
  socket.on('message', ({ nickname, chatMessage }) => {
    console.log(nickname, chatMessage);
    io.emit('message', userMessageFormatter(nickname, chatMessage));
  });

  socket.on('disconnect', () => {
    const userIndex = usersOnline.indexOf(userNickname);
    usersOnline = usersOnline.filter((_, index) => index !== userIndex);
    console.log(usersOnline);
  });
});
