const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

require('./sockets/message')(io);
require('./sockets/nickname')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
