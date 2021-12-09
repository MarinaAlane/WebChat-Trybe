const message = require('./message');
const changeNickName = require('./changeNickName');

const arrayUsersOnline = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, 16);
    arrayUsersOnline.push(randNameId);
    io.emit('usersOnline', arrayUsersOnline);

    message(io, socket);
    changeNickName(arrayUsersOnline, io, socket);

    socket.on('disconnect', () => {
      const index = arrayUsersOnline.indexOf(randNameId);
      arrayUsersOnline.splice(index, 1);
      io.emit('usersOnline', arrayUsersOnline);
    });
  });
};
