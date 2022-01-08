const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);
const now = new Date();

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const getDateAndTime = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds} ${ampm}`;
};

io.on('connect', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', `${getDateAndTime(now)} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('user', (nick) => {
    io.emit('user', {
      newNickname: nick.newNickname,
      nickUpdateMessage: `${nick.oldNickname} alterou seu usuário para ${nick.newNickname}` });
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado!`);
  });
});

server.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
