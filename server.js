const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
 
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

require('./sockets/messageSocket')(io);
require('./sockets/userSocket')(io);

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));