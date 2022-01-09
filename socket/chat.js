/* eslint-disable max-lines-per-function */
const moment = require('moment');
const model = require('../models/messagesModels');

let users = [];

const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

const insertMessage = async (message, nickname) => {
  const data = {
    message,
    nickname,
    timestamp: date,
  };
  await model.messagesModel(data);
};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.handshake.query.nick} conectou`);

  users.push({ id: socket.id, nick: socket.handshake.query.nick });
  io.emit('users', users);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await insertMessage({ chatMessage, nickname });
    const history = await model.getAll();
    io.emit('message', history);
  });

  socket.on('users', (name) => {
    const index = users.findIndex(({ id }) => id === socket.id);
    users[index].nick = name;
    socket.broadcast.emit('users', users);
  });

  socket.on('getMessages', async () => {
    const data = await model.getAll();
    io.emit('showHistory', data);
  });

  socket.on('disconnect', () => {
    users = users.filter(({ id }) => id !== socket.id);
    io.emit('users', users);
  });
});