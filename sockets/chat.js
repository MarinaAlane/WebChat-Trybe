const userMessageFormatter = require('../utils/userMessageFormatter');

let usersOnline = [];

module.exports = (io) => io.on('connection', (socket) => {
  let userNickname = socket.id.slice(0, 16);
  usersOnline.push(userNickname);

  // [X] 1º - Remover o envio do nickName e fazer um evento próprio;
  io.emit('userConnected', usersOnline);
  socket.emit('setUserId', { userNickname, usersOnline });

  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', userMessageFormatter(nickname, chatMessage));
  });

  socket.on('changeNickname', (name) => {
    usersOnline = usersOnline.map((user) => (user === userNickname ? name : user));
    userNickname = name;
    io.emit('changeUsersName', usersOnline);
    socket.emit('setUserId', { userNickname, usersOnline });
  });

  socket.on('disconnect', () => {
    const userIndex = usersOnline.indexOf(userNickname);
    usersOnline = usersOnline.filter((_, index) => index !== userIndex);
    io.emit('userDisconnected', usersOnline);
  }); 
});
