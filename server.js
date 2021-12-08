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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`${socket.id} conectou`);
  socket.emit('randomUser', socket.id);
  socket.on('message', (objMessage) => {
    const getFormatedMessage = messageService.createMessage(objMessage);
    io.emit('message', getFormatedMessage);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} desconectou`);
  });
});

server.listen(PORT, console.log(`Escutando a porta ${PORT}`));