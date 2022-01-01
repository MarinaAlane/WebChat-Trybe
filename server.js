// Faça seu código aqui

const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat.js')(io); // add a chamada

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});