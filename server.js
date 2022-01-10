const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const formatMsg = require('./utils/formatMessage');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

const users = {};

io.on('connection', (socket) => {
  users[socket.id] = socket.id.slice(0, 16);
  console.log(`${users[socket.id]} está online`);

  io.emit('users', users);

  socket.on('message', ({ chatMessage, nickname = users[socket.id] }) => {
    io.emit('message', formatMsg(nickname, chatMessage));
  });

  socket.on('changeNick', (newNick) => {
    const oldNick = users[socket.id];
    users[socket.id] = newNick;
    console.log(`${oldNick} mudou o nick para ${users[socket.id]}`);
  });

  socket.on('disconnet', () => {
    delete users[socket.id];
    console.log(`usuário ${socket.id} desconectou`);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(`${__dirname}/views/`, 'index.html'));
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
