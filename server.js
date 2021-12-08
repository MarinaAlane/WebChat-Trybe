const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'webchat.html'));
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));