const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

const server = require('http').createServer(app);

const { formatDate } = require('./services');

const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(path.join(`${__dirname}, index.html`));
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${formatDate()} ${message.nickname}: ${message.chatMessage}`);
  });
});

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
