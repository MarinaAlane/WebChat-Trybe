const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const moment = require('moment');

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: { 
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  },
});

const { getAllMessages, postMessage } = require('./models/messages');

app.use(express.static(path.join(__dirname, '/public')));

const users = [];

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

io.on('connection', async (socket) => {
  users[socket.id] = socket.id.slice(0, 16);
  io.emit('userList', Object.values(users));

  socket.on('message', async ({ nickname, chatMessage }) => {
    await postMessage({ timestamp, nickname, chatMessage });
    io.emit('message', `${timestamp} - ${nickname} - ${chatMessage}`);
  });

  socket.emit('chatHistory', await getAllMessages());

  socket.on('nickName', (nickName) => {
    users[socket.id] = nickName;
    io.emit('userList', Object.values(users));
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('userList', Object.values(users));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
