const express = require('express');

const app = express();

const { resolve } = require('path');
const cors = require('cors');

const PORT = 3000;

const http = require('http').createServer(app); // criando um servidor http
const io = require('socket.io')(http, { // usando o servidor pra poder rodar o socket.io
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/socket')(io);

app.use(express.static(resolve(__dirname, 'public')));

app.use('/', (_req, res) => {
  res.sendFile(resolve(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use(cors()); // é um middleware de compartilhamento de recursos de origem cruzada (back e front end)

http.listen(PORT, console.log(`Socket.io online on port ${PORT}!`));
