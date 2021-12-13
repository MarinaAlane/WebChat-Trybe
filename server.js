// Faça seu código aqui
require('dotenv').config();
const app = require('express')();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { newDate } = require('./src/structures/structures');

const server = http.createServer(app);
const io = new Server(server); 

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectou`);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${newDate()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));