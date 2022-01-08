require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.use(express.static(path.join(`${__dirname}/public`)));

app.use('/', (_req, res) => {
  res.sendFile(path.join(`${__dirname}/public`));
});

app.use(express.json());

server.listen(PORT, console.log(`Servidor escutando na porta ${PORT}!`));
