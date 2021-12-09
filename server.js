// Faça seu código aqui 
const express = require('express');
const http = require('http');
const path = require('path');
const moment = require('moment');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const onUsers = {};

io.on('connection', (socket) => {
  onUsers[socket.id] = socket.id.substring(0, 16);
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:mm:ss a');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('altName', (nickname) => {
    onUsers[socket.id] = nickname;
    io.emit('userList', onUsers);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));