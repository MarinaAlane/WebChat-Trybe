const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.set(express.static(path.join('views')));
app.set('views', path.join('views'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

require('./sockets/webchat')(io);

server.listen(PORT, () => console.log('Ouvindo a porta 3000'));