const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { sendMessage, changeNickname, disconnectUser } = require('./callbacks');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/', 'index.html'));
});

const usersList = {
  online: [],
  addUser(user) {
    this.online.push(user);
  },
  removeUser(id) {
    const index = this.online.findIndex((userData) => id === userData.id);
    this.online.splice(index, 1);
  },
  changeUserNick(newNick, id) {
    const index = this.online.findIndex((userData) => id === userData.id);
    this.online[index].nickname = newNick;
  },
};

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);
  usersList.addUser({ id: socket.id, nickname: socket.id.substring(0, 16) });
  io.emit('connection', usersList.online);

  socket.on('message', ({ chatMessage, nickname }) => { 
    sendMessage({ chatMessage, nickname }, usersList, io, socket);
  });

  socket.on('changeNickname', ({ nickname, id }) => {
    changeNickname({ nickname, id }, usersList, io, socket);
  });

  socket.on('disconnect', () => {
    disconnectUser(usersList, io, socket); 
  });
});

module.exports = {
  server,
  io,
};
