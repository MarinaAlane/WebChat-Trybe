const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { sendMessage, changeNickname, disconnectUser, retrieveHistory } = require('./callbacks');

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

// acho que tenho que refazer essa estrutura... 😞
io.on('connection', async (socket) => {
  const msgHist = await retrieveHistory();
  console.log(`usuário ${socket.id} conectado`);
  usersList.addUser({ id: socket.id, nickname: socket.id.substring(0, 16) });
  io.emit('connection', usersList.online);
  // https://qastack.com.br/programming/4647348/send-message-to-specific-client-with-socket-io-and-node-js
  //   Você pode usar
  // // envia mensagem apenas para o remetente-cliente
  // socket.emit('message', 'check this');
  // // ou você pode enviar para todos os ouvintes, incluindo o remetente
  // io.emit('message', 'check this');
  // // envia para todos os ouvintes, exceto o remetente
  // socket.broadcast.emit('message', 'this is a message');
  // // ou você pode enviá-lo para uma sala
  // socket.broadcast.to('chatroom').emit('message', 'this is the message to all');

  // originalmente eu usei a solução comentada abaixo para emitir somente para o client que se conectou
  // io.to(socket.id).emit('msgHistory', msgHist);
  // porem o código em vigor abaixo parece melhor.
  socket.emit('msgHistory', msgHist);

  socket.on('message', async ({ chatMessage, nickname }) => { 
    await sendMessage({ chatMessage, nickname }, usersList, io, socket);
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
