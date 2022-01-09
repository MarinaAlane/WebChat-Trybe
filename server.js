const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);
const now = new Date();

const messageRoutes = require('./routes/messageRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/message', messageRoutes);
app.use(express.static(`${__dirname}/views`));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const getRandomNickname = () => `User${Math.round(Math.random() * 100000000000000)}`;

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

let users = [];

io.on('connection', (socket) => {
  const newUser = getRandomNickname();
  socket.emit('nickname', newUser);

  users.push({ id: socket.id, nickname: newUser });

  io.emit('online', users);

  socket.on('message', (msg) => {
    io.emit('message', `${getDateAndTime(now)} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('user', (newNickname) => {
    users = users.map((user) => (
      user.id === socket.id ? { id: socket.id, nickname: newNickname } : user
    ));
    io.emit('online', users);
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit('online', users);
  });
});

server.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
