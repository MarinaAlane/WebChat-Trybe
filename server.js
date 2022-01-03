const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const appServer = http.createServer(app);
const io = new Server(appServer);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectado`);
  const dataMessage = new Date();
  const onlyDate = dataMessage.toLocaleDateString('pt-BR').replace(/\//g, '-');
  const onlyTime = dataMessage.toLocaleTimeString('pt-BR', { hour12: true });
  console.log(onlyDate, onlyTime);

  console.log(dataMessage);

  socket.on('message', (msg) => {
    io.emit('message', `${onlyDate} ${onlyTime} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

appServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));