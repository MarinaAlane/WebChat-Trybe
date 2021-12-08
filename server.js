const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { dateGenerator, randomNickGenerator } = require('./helpers/helpers');
 
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  const randomNick = randomNickGenerator(16);
  console.log(`usuário ${randomNick} conectado`);
  socket.broadcast.emit('userLogin', `usuário ${randomNick} conectado`);
  
  socket.emit('setUser', randomNick);

  socket.on('message', ({ chatMessage, nickname }) => {
    const nick = nickname || randomNick;
    const date = dateGenerator();
    io.emit('message', `${date} - ${nick}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));