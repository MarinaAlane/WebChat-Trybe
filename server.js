// codigo de Laura Gusmao usado como referencia na criação do server: https://github.com/tryber/sd-011-project-webchat/pull/85/files
const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/frontend`));

require('./sockets/chat.js')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => console.log('Server on na porta: 3000')); 