const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();

const server = require('http').createServer(app);

const date = moment().format('DD-MM-yyyy HH:mm:ss');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

// é um escutador, escuta o que está no 'remetente/cliente' - escuta a conexão de forma geral
io.on('connection', (socket) => {
  const userId = socket.id.slice(0, 16);

  socket.emit('connectedUser', userId);
  console.log(userId);

  // escuta a msg de quem está enviando (tipo uma msg privada)
  socket.on('message', (info) => {
    console.log(info);
    io.emit('message', `${date} - ${info.nickname}: ${info.chatMessage}`);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
