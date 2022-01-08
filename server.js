const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { format } = require('date-fns');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected.`);
  const nick = socket.id.slice(1, 17);
  
  io.emit('connected', nick);
  
  socket.on('nick', (nickname) => {
    io.emit('nick', nickname);
  });

  socket.on('message', (msg) => {
    // const { chatMessage, nickname } = msg;
    const formattedDate = format(new Date(), 'dd-mm-yyyy hh:mm:ss');

    io.emit('message', `${formattedDate} - ${msg.nickname}: ${msg.message}`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconected.`);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
