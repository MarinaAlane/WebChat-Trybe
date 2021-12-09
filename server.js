// Faça seu código aqui
require('dotenv').config();
const express = require('express');
// https://moment.github.io/luxon/#/tour
const { DateTime } = require('luxon');
const path = require('path');

const app = express();

const { Server } = require('socket.io');
const http = require('http').createServer(app);

const io = new Server(http);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
io.on('connection', (socket) => {
  console.log(`${socket.id} entrou`);
  socket.on('message', (msg) => {
    io.emit('message',
    `${DateTime.now().toFormat('dd-LL-yyyy hh:mm:ss')} ${msg.nickname}: ${msg.chatMessage}`);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
});
