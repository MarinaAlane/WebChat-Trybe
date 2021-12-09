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

const Messages = require('./models/messages');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

require('./sockets/chat')(io);

app.get('/', async (req, res) => {
  const randNick = await cryptoRandomString(16);
  res.status(200).render('chat.ejs', { randNick });
});

app.get('/message', async (req, res) => {
  const messages = await Messages.getAllMessages();
  res.status(200).json(messages);
});
app.post('/message', async (req, res) => {
  const { message, nickname, timestamp } = req.body;
  const savedMessage = await Messages.saveMessage(message, nickname, timestamp);
  res.status(201).json(savedMessage);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});