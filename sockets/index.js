const message = require('./message');
const changeArrayUserOnline = require('../middleware/changeArrayUserOnline');
const deleteUserOnlieneArray = require('../middleware/deleteUserOnlieneArray');

let arrayUsersOnline = []; // Responsável para controlar os usuários conectados

module.exports = (io) => {
  io.on('connection', (socket) => {
    const idsectionUser = socket.id.slice(0, 16);
    arrayUsersOnline.push({ section: idsectionUser, userNickName: idsectionUser });

    io.emit('usersOnline', { section: idsectionUser, userNickName: idsectionUser }); // para todos
    socket.emit('setmeOnline', { arrayUsersOnline, idsectionUser }); // Somente para o usuario que acabou de conectar

    message(io, socket);

    socket.on('changeNickName', (nickname) => {
      arrayUsersOnline = changeArrayUserOnline(arrayUsersOnline, idsectionUser, nickname);
      io.emit('changerUser', { idsectionUser, nickname });
    });

    socket.on('disconnect', () => {
      arrayUsersOnline = deleteUserOnlieneArray(arrayUsersOnline, idsectionUser);
      io.emit('disconnectUser', { idsectionUser });
    });
  });
};
