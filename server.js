// Faça seu código aqui

const express = require('express');
// const cors = require('cors');
// const path = require('path');
const app = express();
const http = require('http').createServer(app);
const PORT = 3000;

// app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST']
  }
});

app.use(express.static(__dirname + '/frontend'));

require('./backend/socket')(io);

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ping', (_req, res) => res.send('PONG!'));

http.listen(PORT, () => console.log(`Running Wechat in ${PORT} port`));