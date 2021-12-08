// Faça seu código aqui
const express = require('express');
const cryptoRandomString = require('crypto-random-string');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');

app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.get('/', async (req, res) => {
  const randNick = await cryptoRandomString(16);
  res.status(200).render('chat.ejs', { randNick });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});