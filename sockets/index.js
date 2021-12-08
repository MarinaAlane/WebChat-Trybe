const message = require('./chat');
const disconnect = require('./disconnect');
const users = require('../userDataBase');
const { getAll } = require('../models/messageModel');

module.exports = (io) =>
  io.on('connection', (socket) => {
    message(socket, io);
    socket.on('newUserConnection', async () => {
      const nickname = socket.id.substring(0, 16);
      const allMessages = await getAll();
      socket.emit('renderAllMessages', allMessages);
      io.emit('newUserConnection', users('add', { id: nickname, nickname }));
    });
    socket.on('updateNickname', async ({ newNickname }) => {
      const id = socket.id.substring(0, 16);
      const validationArray = users().map((user) => user.id === id);
      const indexUser = validationArray.indexOf(true);
      users('update', { index: indexUser, newNickname });
      io.emit('newUserConnection', users());
    });
    disconnect(socket, io);
  });