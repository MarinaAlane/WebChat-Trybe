const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.createServer(app);

const io = new Server(server);
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  const user = socket.id.slice(0, 16);
  io.emit('online', user);
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${timeStamp} ${nickname}: ${chatMessage}`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));