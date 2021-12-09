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

  const allOnlineUsers = [];

io.on('connection', (socket) => { // quando conectado:
  console.log('usuario contectou - server');
  // vou montar um usuario
  const newUser = { id: socket.id, nickname: socket.id.substring(0, 16) };
  // adicionar o usuario ao meu array
  allOnlineUsers.push(newUser);
  // envia array completo de usuarios conectados
  socket.emit('conectedUsers', allOnlineUsers);

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