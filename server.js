const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { format } = require('date-fns');
// const LocalStorage = require('node-localstorage');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// eslint-disable-next-line max-lines-per-function
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected.`);
  const nick = socket.id.slice(1, 17);
  io.emit('connected', nick);

  socket.on('message', (msg) => {
    const { chatMessage, nickname } = msg;
    const formattedDate = format(new Date(), 'dd-mm-yyyy hh:mm:ss');

  //   if (chatMessage) {
    // io.emit('message', `${nickname}: ${chatMessage}`);
  //   }

    io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('nick', (nickname) => {
    io.emit('nick', nickname);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconected.`);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
