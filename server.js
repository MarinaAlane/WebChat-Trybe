const express = require('express');
const moment = require('moment');

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

io.on('connection', (socket) => { // quando conectado:
  // ADD servidor deve enviar aos outros usuarios que este se conectou
  console.log(`Usuário conectado. ID: ${socket.id} `);
    socket.emit('conected', socket.id);

  // momento dois, servidor recebe mensagem do usuario
  socket.on('message', (params) => {
    const date = moment().format('DD-MM-yyyy HH:mm:ss A');
    console.log(date);
    const { chatMessage, nickname } = params;
  // momento 3, servidor faz algo com a info recebida (tipo formatar) e enviar
    const newMessage = `${date} ${nickname}: ${chatMessage}`; // falta adicionar a hora e trocar id por nickName
    io.emit('message', newMessage);
  });
});

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));