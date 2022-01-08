const express = require('express');
const path = require('path');
// const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || '3000';
const server = require('http').createServer(app);

const io = require('socket.io')(server, { 
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
}); // envia formulario quando cliente conecta com a rota

const users = {};
const getDate = require('./helpers/getDate');

io.on('connection', (socket) => {
  users[socket.id] = socket.id.substr(0, 16);
  io.emit('newUser', users[socket.id]);
  console.log(`Novo usuário ${users[socket.id]} conectado ao socket.io`);

  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    const fullDate = getDate();
    console.log('--------->', nickname, socket.id);
    io.emit('message', `${fullDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('setNickname', (newNickname) => {
    users[socket.id] = newNickname;
  });

  // io.emit('message', `Novo usuário ${users[socket.id]} conectado)`);
  // const fullDate = getDate();
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
