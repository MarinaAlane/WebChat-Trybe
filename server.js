// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { getAll } = require('./models/mensagens');
const createMessage = require('./mensagens');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const users = {};

io.on('connection', async (socket) => {
  const todaInfo = await getAll().then((e) =>
    e.map(({ timestamp, nickname, message }) => `${timestamp} ${nickname} ${message}`));

  users[socket.id] = socket.id.slice(0, 16);

  io.emit('newConnection', { user: users[socket.id], todaInfo });
  
  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('users', Object.values(users));
  });

  socket.on('message', async ({ messageValue, nickName }) => {
    const response = await createMessage(messageValue, nickName);
    io.emit('message', response);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', Object.values(users));
  });
});

server.listen(PORT, () => console.log(`estou escutando na porta ${PORT}`));
