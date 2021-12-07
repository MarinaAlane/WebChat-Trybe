const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

const ChatController = require('./controllers/ChatController');

const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/', ChatController);

const messages = io.on('connection', (socket) => {
  socket.on('userConnect', ({ name }) => {
    console.log(`${name} se conectou`);
    io.emit('connectingUser', `${name} se conectou`);
  });
});

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
