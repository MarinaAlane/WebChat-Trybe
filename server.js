// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*', // url aceita pelo cors http://localhost:3000
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);
require('./sockets/users')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(PORT, () => {
  console.log('Servidor ouvindo na porta 3000');
});