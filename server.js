const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);

  socket.on('message', ({ message }) => {
    console.log(`${socket.id} emitiu um ping!`);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}index.html`);
});

http.listen(3000, () => {
  console.log('Listening at port 3000');
});
