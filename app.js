const path = require('path');
const express = require('express');
const { getAllController } = require('./controllers/messages');
const { parseMessage } = require('./socket/socketChat');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', async (_req, res) => {
  const name = 'aaaaaaaaaaaaaaaa';
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVXZ';
  const random = name.split('').map(() => abc.charAt(Math.floor(Math.random() * 16))).join('');
  const messages = await getAllController();
  const parseMessages = messages.map(parseMessage);
  res.status(200).render('index', { nickname: random, messages: parseMessages });
});

module.exports = app;