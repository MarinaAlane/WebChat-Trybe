const express = require('express');

const app = express();
const path = require('path');
const server = require('http').createServer(app);
require('dotenv').config();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(path.join(__dirname, '/public')));

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
