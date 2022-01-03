const express = require('express');

const app = express();

const http = require('http');
const path = require('path');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const moment = require('moment');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('message', (msg) => { // socket.on escuta somente a mensagem do usuario emissor.
      console.log('message: ', msg.message);
      const date = moment().format('DD-MM-YYYY HH:mm:ss');
      const chatLine = `${date} ${msg.nickname}: ${msg.chatMessage}`;
      io.emit('message', chatLine); // io.emit emite a todos a mensagem que foi enviada por um usuario
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});