const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET'],
  },
});

app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

require('./sockets/message')(io);
require('./sockets/nickname')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
