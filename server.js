const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { dateGenerator } = require('./helpers/helpers');
 
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const nick = nickname || socket.id;
    const date = dateGenerator();
    io.emit('message', `${date} - ${nick}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));