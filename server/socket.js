const { saveMessage, getAllMessages } = require('../models/messagesModel');
const { formatDate } = require('../utils/formatDate');

const users = {};
const userNickname = null;

const onConnection = async (socket) => {
  const nickname = userNickname || socket.id.slice(0, 16);
  socket.emit('getNickname', nickname);

  const allMessages = await getAllMessages();
  socket.emit('refreshMessages', allMessages);
};

const onDisconnect = (io, socket) => {
  delete users[socket.id];
  io.emit('updateUsers', users);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    onConnection(socket);

    socket.on('message', async (msg) => {
      const { chatMessage: message, nickname } = msg;
      const date = formatDate();

      await saveMessage({ message, nickname, date });

      const messageFormatted = `${date} - ${nickname}: ${message}`;

      io.emit('message', messageFormatted);
    });

    socket.on('updateNickname', (nickname) => {
      users[socket.id] = nickname;
      io.emit('updateUsers', users);
    });

    socket.on('disconnect', () => {
      onDisconnect(io, socket);
    });
  });
};
