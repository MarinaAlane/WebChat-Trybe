const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || '3000';

const server = require('http').createServer(app);
const io = require('socket.io')(server, { 
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const getDate = require('./helpers/getDate');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
}); // envia formulario quando cliente conecta com a rota

const users = {};

io.on('connection', (socket) => {
  users[socket.id] = socket.id.substr(0, 16); // Define um nome aleatorio para cada usuario na chave de seu id.
  console.log(`Novo usuário ${users[socket.id]} conectado ao socket.io`);
  console.log(`oooooooooo ${users} `);

  io.emit('nickname', users[socket.id]); // "servidor, envie a lista de usuarios para todos os sockets conectados"

  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    const fullDate = getDate();

    io.emit('message', `${fullDate} - ${users[nickname]}: ${chatMessage}`);
  });

  socket.on('setNickname', (newNickname) => {
    users[socket.id] = newNickname;
    io.emit('nickname', newNickname);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado. (server.js)`);
    delete users[socket.id];

    io.emit('nickname', users[socket.id]);
  });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
