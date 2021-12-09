// Faça seu código aqui
require('dotenv').config();
const express = require('express');
// https://moment.github.io/luxon/#/tour
const { DateTime } = require('luxon');
const path = require('path');

const app = express();

const { Server } = require('socket.io');
const http = require('http').createServer(app);

const io = new Server(http);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

function generateToken(length) {
  // https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
  const a = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

io.on('connection', (socket) => {
  socket.emit('logado', generateToken(16));

  socket.on('message', (msg) => {
    io.emit('message',
    `${DateTime.now().toFormat('dd-LL-yyyy hh:mm:ss')} ${msg.nickname}: ${msg.chatMessage}`);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
});
