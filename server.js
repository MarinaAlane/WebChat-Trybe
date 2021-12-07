const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

require('./sockets/chat')(io);

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.use(express.static(`${__dirname}/public`));

http.listen(3000, () => {
  console.log('Servidor on na porta 3000');
});
