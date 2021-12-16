const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: { 
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  },
});

app.use(express.static(path.join(__dirname, '/public')));

const users = [];

io.on('connection', (socket) => {
  users[socket.id] = socket.id;
  io.emit('userList', Object.values(users));

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('userList', Object.values(users));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
