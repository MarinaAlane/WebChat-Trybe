const express = require('express');

const path = require('path');
const http = require('http');

const { Server } = require('socket.io');

const moment = require('moment');
const { saveMessage, getMessages } = require('./models/chat');

const app = express();

const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);

  socket.on('message', ({ chatMessage, nickname }) => {
    saveMessage({
      message: chatMessage, nickname, timestamp: moment().format('DD-MM-yyyy HH:mm:ss'),
    });

    io.emit('message', `${moment().format('DD-MM-yyyy HH:mm:ss A')} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newUser', async () => {
    const valueMessages = await getMessages();
    
    if (valueMessages !== []) {
      valueMessages.map(({ message, nickname, timestamp }) => 
        io.emit('message', `${timestamp} - ${nickname}: ${message}`));
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
