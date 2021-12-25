const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();

const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${moment().format('DD-MM-yyyy HH:mm:ss A')} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
