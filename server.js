const express = require('express');
const path = require('path');

const moment = require('moment');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

const ftMsg = moment().format('MM-DD-YYYY h:mm A');

let users = [];

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
  const userOnline = socket.id.slice(0, 16);
  
  socket.emit('user-connected', userOnline);

  socket.on('setNickname', (nickname) => {
    users = users.filter((user) => user.id !== socket.id);
    users.push({ id: socket.id, nickname });
    io.emit('userOnline', users);
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit('userOnline', users);
  });

  socket.on('message', (data) => {
    io.emit('message', `${ftMsg} - ${data.nickname}: ${data.chatMessage}`);
  });
});

app.use('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});