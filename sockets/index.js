const message = require('./message');
const changeArrayUserOnline = require('../middleware/changeArrayUserOnline');
const deleteUserOnlieneArray = require('../middleware/deleteUserOnlieneArray');
// const getOldNameIndex = require('../middleware/getNameIndex');

let arrayUsersOnline = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const randNameId = socket.id.slice(0, 16);
    arrayUsersOnline.push({ section: randNameId, userNickName: randNameId });
    io.emit('usersOnline', { section: randNameId, userNickName: randNameId }); // para todos
    socket.emit('setUsersOnlineMe', { arrayUsersOnline, randNameId }); // so para mim

    message(io, socket);

    socket.on('changeNickName', (nickname) => {
      arrayUsersOnline = changeArrayUserOnline(arrayUsersOnline, randNameId, nickname);
      io.emit('changerUser', { randNameId, nickname });
    });

    socket.on('disconnect', () => {
      arrayUsersOnline = deleteUserOnlieneArray(arrayUsersOnline, randNameId);
      io.emit('removeuserOnline', { randNameId });
    });
  });
};
