const getNameIndex = require('../middleware/getNameIndex');

module.exports = (arrayUsersOnline, io, socket) => {
  const randNameId = socket.id.slice(0, 16);
  socket.on('changeNickName', (nickname, oldName) => {
    const getName = getNameIndex(arrayUsersOnline, randNameId, oldName);
    const index = arrayUsersOnline.indexOf(getName);
    // eslint-disable-next-line no-param-reassign
    arrayUsersOnline[index] = nickname;
    io.emit('usersOnline', arrayUsersOnline);
  });
};
