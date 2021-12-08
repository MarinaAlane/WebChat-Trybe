// Faça seu código aqui
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log(`usuário entrou ID: ${socket.id}`);
  // retorna valor aleatorio em string em forma hexadecimal
  const randomNickName = crypto.randomBytes(8).toString('hex');
  socket.on('disconnect', () => {
    console.log(`${socket.id} saiu`);
  });

  socket.emit('randomNickname', randomNickName);

  socket.on('message', (msg) => {
    console.log(msg);
    const date = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${date} - ${msg.nickname}: ${msg.chatMessage}`);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

http.listen(3000, () => {
  console.log('rodando na 3000');
});