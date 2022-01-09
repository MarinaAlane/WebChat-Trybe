const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const formatMsg = require('./utils/formatMessage');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} connectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', formatMsg(nickname, chatMessage));
  });

  socket.on('disconnet', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
