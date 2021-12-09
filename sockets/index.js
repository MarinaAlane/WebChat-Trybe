const message = require('./message');
const getNameIndex = require('../middleware/getNameIndex');

const arrayUsersOnline = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, 16);
    arrayUsersOnline.push(randNameId);
    io.emit('usersOnline', arrayUsersOnline);

    message(io, socket);

    socket.on('changeNickName', (nickname, oldName) => {
      const getName = getNameIndex(arrayUsersOnline, randNameId, oldName);
      const index = arrayUsersOnline.indexOf(getName);
      arrayUsersOnline[index] = nickname;
      io.emit('usersOnline', arrayUsersOnline);
    });

    socket.on('disconnect', () => {
      const index = arrayUsersOnline.indexOf(randNameId);
      arrayUsersOnline.splice(index, 1);
      io.emit('usersOnline', arrayUsersOnline);
    });
  });
};
