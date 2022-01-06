// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
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
  const basNickname = socket.id.slice(0, 16);

  socket.on('message', (message) => {
    const date = moment().format('DD-MM-YYYY, hh:mm:ss');
    const completeMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', completeMessage);
  });

  io.emit('newUser', basNickname);

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
