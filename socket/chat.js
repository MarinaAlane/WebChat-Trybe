const moment = require('moment');
const db = require('../models/messagesModels');

const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

const insertMsg = async (message, nickname) => {
  const data = {
    message,
    nickname,
    timestamp: date,
  };
  await db.messagesModel(data);
  return data;
};

let users = [];

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.handshake.query.nick} conectou`);

  users.push({ id: socket.id, nick: socket.handshake.query.nick });

  io.emit('msg', await db.getAll());
  io.emit('users', users);

  // socket.on('msg', async ({ chatMessage, nickname }) => {
  //   const data = await insertMsg(chatMessage, nickname);
  //   io.emit('msg', `${data.timestamp} ${data.nickname}: ${data.msg}`);
  // });

  socket.on('msg', async ({ chatMessage, nickname }) => {
    insertMsg(chatMessage, nickname);
    io.emit('msg', await db.getAll());
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