const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const moment = require('moment');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit(
      'message',
      `${moment().format(
        'DD-MM-yyyy HH:mm:ss A',
      )} - ${nickname}: ${chatMessage}`,
    );
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
