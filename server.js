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
const { saveMessage, getHistory } = require('./controllers/messageController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/message', messageRoutes);
// app.use(express.static(`${__dirname}/views`));

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

let users = [];

io.on('connection', async (socket) => {
  const newUser = getRandomNickname(16);
  socket.emit('nickname', newUser);
  await getHistory();
  users.push({ id: socket.id, nickname: newUser });

  io.emit('online', users);

  socket.on('message', async (msg) => {
    await saveMessage(msg.chatMessage, msg.nickname, getDateAndTime(now));
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
