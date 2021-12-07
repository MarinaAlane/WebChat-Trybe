const express = require('express');

const app = express();
const http = require('http').createServer(app);

const permissionsConfig = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
};

const io = require('socket.io')(http, permissionsConfig);

// require('./sockets/ALGUMA_COISA')(io);

app.get('/hello', (_, res) => res.send('Hello World'));

http.listen(3000, () => console.log('Running on 3000'));

// Este código foi retirado dos ensinamentos de Socket.io aplicados na Trybe.