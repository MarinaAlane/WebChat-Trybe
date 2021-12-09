const path = require('path');
const express = require('express');
const { getRandomNickName } = require('./services/randomNickname');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views', 'pages'));

app.get('/', (_req, res) => {
  const nickname = getRandomNickName();
  res.status(200).render('home', {
    nickname,
    onSubmit: (e) => {
      e.preventDefault();
      console.log('opa');
    },
  });
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'ping' });
});

module.exports = { app };
