const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const data = new Date();
const dataFormat = `${String(data.getDate()).padStart(2, '0')}\n
  -${String(data.getMonth() + 1).padStart(2, '0')}-${data.getFullYear()}`;

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);

  socket.on('chatmessage', ({ chatMessage, nickname }) => {
    io.emit('chatmessage', `${dataFormat} - ${socket.id || nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));