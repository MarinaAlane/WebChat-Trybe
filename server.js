const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('id', { newId: socket.id, olderId: '' });

  socket.on('id', (id) => {
    socket.emit('id', id);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('en-GB');
    const formatedDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log(`Listening at port: ${3000}`);
});
