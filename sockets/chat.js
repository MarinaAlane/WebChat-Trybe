const database = require('../models/Messages');

const makeDate = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

let users = [];

const saveMessage = async (message, nickname) => {
  const data = {
    message,
    nickname,
    timestamp: makeDate(),
  };
  await database.addMessage(data);
};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`Usuário conectado. Nick: ${socket.handshake.query.nick} `);
  users.push({ id: socket.id, nick: socket.handshake.query.nick });
  io.emit('message', await database.getAll());
  io.emit('users', users);
  socket.on('message', async ({ chatMessage, nickname }) => {
    await saveMessage(chatMessage, nickname);
    io.emit('message', await database.getAll());
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
