const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const messageService = require('./services/messageService');

let usersOnline = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const newNames = (newNickname) => {
  const removedUser = usersOnline
  .filter((user) => user.userId !== newNickname.userId);
  removedUser.push(newNickname);
  usersOnline = removedUser;
};

io.on('connection', (socket) => {
  socket.emit('connection', usersOnline);
  socket.on('addUsers', (newUserArray) => { usersOnline = newUserArray; });

  socket.on('message', async (objMessage) => {
    const getFormatedMessage = await messageService.createMessage(objMessage);
    io.emit('message', getFormatedMessage);
  });

  socket.on('newUser', (newUser) => socket.broadcast.emit('newUser', newUser));

  socket.on('changeUser', (newNickname) => {
    newNames(newNickname);    
    socket.broadcast.emit('changeUser', newNickname);
  });
  
  socket.on('disconnect', () => {
    const key = socket.id;
    const removedUser = usersOnline.filter((remove) => remove.userId !== key);
    usersOnline = removedUser;
    socket.broadcast.emit('offUser', key);
  });
});

// io.on('disconnect', (socket) => {
//   const key = socket.id;
//   const removedUser = usersOnline.filter((remove) => remove.userId !== key);
//   usersOnline = removedUser;
//   socket.broadcast.emit('offUser', key);
// });

server.listen(PORT, console.log(`Escutando a porta ${PORT}`));