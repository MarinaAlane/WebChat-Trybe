const express = require('express');

const app = express();

const http = require('http').createServer(app);
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || '3000';

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

require('./sockets/chat')(io);

http.listen(PORT, () => {
  console.log('Online');
});