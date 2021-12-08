const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  
const { createMessage, getMessages } = require('./controllers/index');

app.use(express.static(path.join(__dirname, '/public')));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/message', createMessage);

app.get('/message', getMessages);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});