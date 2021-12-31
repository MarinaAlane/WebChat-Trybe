const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', './index.html')));

io.on('connection', (socket) => {
  console.log(`${socket} conectado`);

  socket.on('message', ({ nickname, chatMessage }) => {
    const date = new Date();
    const hour = date.toLocaleTimeString();
    const dateFormated = date.toISOString().split('T')[0].split('-').reverse().join('-');
    const completeDate = `${dateFormated} ${hour}`;
    io.emit('message', `${completeDate} - ${nickname}: ${chatMessage}`);
  });
});

http.listen(port, () => console.log(`listening on port ${port}!`));
