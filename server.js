const express = require('express');
const http = require('http');
const path = require('path');
const dateTime = require('node-datetime'); // https://www.ti-enxame.com/pt/node.js/como-obter-data-e-hora-atual-com-o-formato-y-m-d-h-m-s-usando-biblioteca-node-datetime-de-nodejs/825445513/
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

function getData() {
  const data = dateTime.create();
  return data.format('d-m-Y H:M:S');
}

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    if (nickname) {
      io.emit('message', `${getData()} - ${nickname}: ${chatMessage}`);
    } else {
      io.emit('message', `${getData()} - ${socket.id}: ${chatMessage}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));