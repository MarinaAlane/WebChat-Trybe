/* eslint-disable max-lines-per-function */
const getBrazilianDate = require('../utils/getBrazilianDate');

const formatedUser = (data) => `${getBrazilianDate()} - ${data.nickname}: ${data.chatMessage}`;

const connectedUsers = [];

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
    const indexToUpdateUser = connectedUsers
      .findIndex(({ nickname }) => nickname === oldNickname);

    connectedUsers[indexToUpdateUser].nickname = newNickname;
    io.emit('updateUser', connectedUsers);
  });

  socket.on('disconnect', () => {
    const indexOfUser = connectedUsers
      .findIndex(({ id }) => id === socket.id);
    connectedUsers.splice(indexOfUser, 1);
    console.log(`"${socket.id}" saiu`);
    io.emit('updateUser', connectedUsers);
  });
});