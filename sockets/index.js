const message = require('./chat');

const users = [];
module.exports = (io) =>
  io.on('connection', (socket) => {
    message(socket, io);
    socket.on('newUserConnection', async ({ nickname }) => {
      users.push(nickname);
      io.emit('newUserConnection', users);
    });
    socket.on('updateNickname', async ({ oldNickname, newNickname }) => {
      const indexUser = users.indexOf(oldNickname);
      users[indexUser] = newNickname;
      socket.emit('newUserConnection', { nickname: newNickname }); // parei aqui
    });
  });