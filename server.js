const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST'],
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/Chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
