// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3002;
const server = http.createServer(app);
const io = new Server(server);
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuario ${socket.id} conectado`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`usuario ${socket.id} desconectado`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));