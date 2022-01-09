const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);

  const dateFormat = moment().format('DD-MM-yyyy hh:mm:ss A');
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${dateFormat} - ${nickname}:${chatMessage}`);
  });

  socket.emit('user', socket.id.slice(0, 16));

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});
server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));