const { createMessage, getAllMessages } = require('../models/messagesModel');

const allUsers = [];

// https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript

const formatTimestamp = () => {
  const date = new Date();
  const dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
  const hourFormat = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  return `${dateFormat} ${hourFormat}`;
};

// Lógica construída com a ajuda do aluno Luiz Wendel - Turma 11

module.exports = (io) => io.on('connection', async (socket) => {
  let userName = socket.id.substring(0, 16);
  allUsers.push(userName);
  const allMessages = await getAllMessages();

  socket.emit('setup', { userName, allMessages });
  io.emit('user', allUsers);

  socket.on('userNick', (user) => {
    allUsers.splice(allUsers.indexOf(userName), 1, user);
    userName = user;
    io.emit('user', allUsers);
  });

  socket.on('disconnect', () => {
    allUsers.splice(allUsers.indexOf(userName), 1);
    io.emit('user', allUsers);
  });

  socket.on('message', ({ chatMessage }) => {
    io.emit('message', `${formatTimestamp()} - ${userName}: ${chatMessage}`);
    createMessage({ message: chatMessage, nickname: userName, timestamp: formatTimestamp() });
  });
}); 