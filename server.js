// Faça seu código aqui
const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, '/view/chat')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/view/chat/'));
});

const formatedDate = moment().format('MM-DD-YYYY h:mm:ss A');

io.on('connection', (socket) => {
  const { id } = socket;

  socket.emit('generateNickname', id.slice(4));

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });
});

const PORT = 3000;

httpServer.listen(PORT, () => console.log(`API running on port: ${PORT}`));