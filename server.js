const express = require('express');
const http = require('http');
const moment = require('moment');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server); // server com express, http e socket.io

const PORT = 3000;

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// cliente -> servidor -> cliente
let clients = [];
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('isConnected', (nickname) => {
    clients = clients.filter((client) => client.id !== socket.id);
    clients.push({ nickname, id: socket.id });
    io.emit('getOnlineUsers', clients);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const formatedDate = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    // https://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients
    clients = clients.filter((client) => client.id !== socket.id);
    io.emit('getOnlineUsers', clients);
  });
});

server.listen(PORT, () => console.log(`Listening ${PORT}`));