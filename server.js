const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
const messageController = require('./controllers/messageController');
  
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

require('./sockets/chat')(io);
require('./sockets/user')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', messageController.createMessage);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});