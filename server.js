// Faça seu código aqui
const randomString = require('randomstring');

const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  const randomNickname = randomString.generate(16);
  res.status(200).render('chat.ejs', { randomNickname });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
