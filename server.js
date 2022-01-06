const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { randomNameGenerate, dataMessageGenerate } = require('./utils');

const app = express();
const PORT = 3000;
const appServer = http.createServer(app);
const io = new Server(appServer);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  // console.log(`Usuário ${socket.id} conectado`);
  const randomName = randomNameGenerate();
  console.log(`Usuário ${randomName} conectado`);

  socket.on('message', (msg) => {
    const dataMessage = dataMessageGenerate();

    io.emit('message',
    `${dataMessage.date} ${dataMessage.time} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  io.emit('nickname', randomName);

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

appServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));