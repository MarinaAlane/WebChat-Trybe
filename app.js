const path = require('path');
const express = require('express');
const MessageController = require('./controllers/Message');
const { getRandomNickName } = require('./services/randomNickname');
const { chat } = require('./services/chat');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views', 'pages'));

app.get('/', async (_req, res) => {
  const nickname = getRandomNickName();
  const messages = await MessageController.getAll();
  const parsedMessages = messages.map(chat.getParsedMessage);
  res.status(200).render('home', { nickname, messages: parsedMessages });
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'ping' });
});

module.exports = { app };
