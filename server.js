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

const getRandomNickname = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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

const users = [];

io.on('connection', (socket) => {
  users.push(getRandomNickname(16));
  io.emit('onlineUsers', users);
  socket.on('nickname', () => {
    io.emit('nickname', users);
  });

  socket.on('message', (msg) => {
    io.emit('message', `${getDateAndTime(now)} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('user', (nick) => {
    io.emit('user', {
      newNickname: nick.newNickname,
      nickUpdateMessage: `${nick.oldNickname} alterou seu usuário para ${nick.newNickname}` });
  });
});

server.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
