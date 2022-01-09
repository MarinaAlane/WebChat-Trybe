const moment = require('moment');
const model = require('../models/messagesModels');

const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

const messageAux = ({ chatMessage, nickname }) => `${date} - ${nickname}: ${chatMessage}`;

const insertMessage = async (message, nickname) => {
  const data = {
    message,
    nickname,
    timestamp: date,
  };
  await model.messagesModel(data);
};

let users = [];

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.handshake.query.nick} conectou`);

  users.push({ id: socket.id, nick: socket.handshake.query.nick });
  io.emit('users', users);

  const loadMsg = await model.getAll();

  socket.emit('loadMsg', loadMsg);
  
  socket.on('message', (data) => {
    insertMessage(data.chatMessage, data.nickname);
    io.emit('message', messageAux(data));
  });

  socket.on('users', (name) => {
    const index = users.findIndex(({ id }) => id === socket.id);
    users[index].nick = name;
    socket.broadcast.emit('users', users);
  });

  socket.on('disconnect', () => {
    users = users.filter(({ id }) => id !== socket.id);
    io.emit('users', users);
  });
});