const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const now = new Date();
    const date = now.toLocaleDateString().replace(/\//g, '-');
    const hour = now.toLocaleTimeString();

    console.log(`${date} ${hour} ${nickname}: ${chatMessage}`);
    io.emit('message', `${date} ${hour} ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

module.exports = {
  server,
};
