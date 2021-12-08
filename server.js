const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`-> ${socket.id} está conectado`);
});

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));