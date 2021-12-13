const express = require('express');

const app = express();

const PORT = 3000;
const server = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './src/public')));

app.get('/', (_req, res) => {
  res.status(201).sendFile(path.join(__dirname, '/index.html'));
});

require('./src/sockets/chat')(io);

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));