const getBrazilianDate = require('../utils/getBrazilianDate');

const formatedUser = (data) => `${getBrazilianDate()} - ${data.nickname}: ${data.chatMessage}`;

const connectedUsers = [];

const findIndexViaNickname = (oldNickname) => {
  const indexToUpdateUser = connectedUsers
  .findIndex(({ nickname }) => nickname === oldNickname);
  return indexToUpdateUser;
};

const findIndexViaSockedId = (sockedId) => {
  const indexToDeleteUser = connectedUsers
      .findIndex(({ id }) => id === sockedId);
    connectedUsers.splice(indexToDeleteUser, 1);
};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Alguém com o Socked.id "${socket.id}" conectou`);
  
  socket.on('message', (data) => {
    io.emit('message', formatedUser(data));
  });

  socket.on('newUser', (nickname) => {
    connectedUsers.push({ nickname, id: socket.id });
    io.emit('updateUser', connectedUsers);
  });

  socket.on('updateUser', ({ oldNickname, newNickname }) => {
    const userIndex = findIndexViaNickname(oldNickname);

    connectedUsers[userIndex].nickname = newNickname;
    io.emit('updateUser', connectedUsers);
  });

  socket.on('disconnect', () => {
    findIndexViaSockedId(socket.id);
    console.log(`"${socket.id}" saiu`);
    io.emit('updateUser', connectedUsers);
  });
});