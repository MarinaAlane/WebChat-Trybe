const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const utils = require('./utils');

const app = express();
const PORT = 3000;
const appServer = http.createServer(app);
const io = new Server(appServer);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let arrayUsers = [];

io.on('connection', (socket) => {
  const randomName = utils.randomNameGenerate();
  socket.on('message', (msg) => {
    const dataMessage = utils.dataMessageGenerate();

    io.emit('message',
    `${dataMessage.date} ${dataMessage.time} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  const objUser = { nickname: randomName, id: socket.id };
  utils.createArrayUsers(arrayUsers, objUser);
  socket.emit('nickname', arrayUsers);
  socket.broadcast.emit('updateOnlineUsers', arrayUsers);

  socket.on('uptadeNickname', (obj) => {
    arrayUsers = utils.updateNickname(arrayUsers, obj);
    io.emit('updateOnlineUsers', arrayUsers);
  });

  socket.on('disconnect', () => {
    arrayUsers = utils.removeUser(arrayUsers, objUser);
    io.emit('nickname', arrayUsers);
  });
});

appServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));