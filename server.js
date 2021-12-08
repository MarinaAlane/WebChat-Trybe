const path = require('path');
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

http.listen(3000, console.log('server is running on port 3000'));
