const users = require('../userDataBase');

module.exports = (socket, io) => {
  socket.on('disconnect', () => {
    const id = socket.id.substring(0, 16);
    users('remove', id);
    io.emit('newUserConnection', users());
  });
};