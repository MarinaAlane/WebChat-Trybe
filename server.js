// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuario ${socket.id} conectado`);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

    socket.on('disconnect', () => {
      console.log(`Usuario ${socket.id} conectado`);
    });

    socket.on('username', (user) => {
      console.log(user);
    });
});

server.listen(PORT, () => console.log(`estou escutando na porta ${PORT}`));