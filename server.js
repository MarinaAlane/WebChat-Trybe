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

const users = {};
// eslint-disable-next-line max-lines-per-function
io.on('connection', (socket) => {
  const nick = socket.id.slice(1, 17);
  console.log(`User ${nick} connected.`);
  
  users[nick] = nick;
  socket.emit('firstNick', nick);
  io.emit('connection', users);

  socket.on('nick', (newNick) => {
    users[nick] = newNick;
    console.log('{users}:', users);
    io.emit('connection', users);
  });
  
  socket.on('disconnect', () => {
    console.log(`User ${nick} disconnected.`);
    delete users[nick];
    io.emit('connection', users);
  });

  socket.on('message', (msg) => {
    const formattedDate = format(new Date(), 'dd-mm-yyyy hh:mm:ss');

    if (msg.chatMessage) {
      io
        .emit('message', `${formattedDate} - ${msg.nickname}: ${msg.chatMessage}`);
    } else {
      io.emit('message', `${formattedDate} - ${msg.nickname}: ${msg.message}`);
    }
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
