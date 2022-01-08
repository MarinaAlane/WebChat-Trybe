const express = require('express');
const http = require('http');
const moment = require('moment');
const path = require('path');
const { Server } = require('socket.io');
// Um socket é um mecanismo de comunicação usado normalmente para implementar um sistema de cliente e servidor, sendo o cliente quem requisita um serviço e servidor quem executa esse serviço, assim como as APIs, que permitem a troca de mensagens entre máquinas/aplicações.

const app = express();
const server = http.createServer(app);
const io = new Server(server); // server com express, http e socket.io

const PORT = 3000;

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// cliente -> servidor -> cliente
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('nickname', (nickname) => {
    console.log(nickname);
    io.emit('nickname', nickname);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const formatedDate = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => console.log(`Listening ${PORT}`));