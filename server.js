const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.use(express.static(path.join('views')));
app.set('views', path.join('views'));

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectado`);

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado`);
  });

  socket.on('chatMessage', (msg) => {
    console.log(`message: ${socket.id} diz: ${msg}`);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => console.log('Ouvindo a porta 3000'));