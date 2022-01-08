const express = require('express');

const app = express();

const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

require('./sockets/messages')(io);

http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
