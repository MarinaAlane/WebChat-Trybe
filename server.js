const express = require('express');
const path = require('path');
const moment = require('moment');
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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

io.on('connection', (socket) => {
  console.log(`Novo usuário ${socket.id} conectado ao socket.io`);

  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    io.emit('message', `${nickname}: ${chatMessage}`);

    console.log(`(socket.on server) ${nickname}: ${chatMessage}`);
  });
});

app.post('/message', (req, res) => {
  const { chatMessage, nickname } = req.body;

  const data = moment().locale('pt-br').format('L').replace(/\//g, '-');
  const time = moment().format('LTS');

  io.emit('message', `${data} ${time} - ${nickname}: ${chatMessage}`);

  return res.status(200).json({ chatMessage, nickname });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
