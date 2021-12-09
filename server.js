const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const path = require('path');

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'webchat.html'));
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const allOnlineUsers = [];
const date = moment().format('DD-MM-yyyy HH:mm:ss A');

const updateList = (updatedUser) => {
  const User = allOnlineUsers.findIndex((user) => user.id === updatedUser.id);
  allOnlineUsers.splice(User, 1);
  allOnlineUsers.push(updatedUser);
  return allOnlineUsers;
};

io.on('connection', (socket) => {
  const newUser = { id: socket.id, nickname: socket.id.substring(0, 16) };
  allOnlineUsers.push(newUser);
  io.emit('conectedUsers', allOnlineUsers);
  socket.on('nickname', (updatedUser) => {
    const updatedList = updateList(updatedUser);
    io.emit('conectedUsers', updatedList);
  });
  socket.on('message', (params) => {
    const { chatMessage, nickname } = params;
    const newMessage = `${date} ${nickname}: ${chatMessage}`; // falta adicionar a hora e trocar id por nickName
    io.emit('message', newMessage);
  });
  socket.on('disconnect', () => {
    const disconnectedUser = allOnlineUsers.findIndex((user) => user.id === socket.id);
    allOnlineUsers.splice(disconnectedUser, 1);
    io.emit('conectedUsers', allOnlineUsers);  
  });
});

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
