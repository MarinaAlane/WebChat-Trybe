const express = require('express');
const http = require('http');
// const path = require('path');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello word');
});

io.on('connection', (socket) => {
  socket.on('message', (objMessage) => {
    socket.emit('message', objMessage);
  });
});

server.listen(PORT, console.log(`Escutando a porta ${PORT}`));