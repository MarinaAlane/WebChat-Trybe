// Faça seu código aqui
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
  res.status(200).render('chat.ejs');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
