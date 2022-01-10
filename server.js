const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/chat.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});