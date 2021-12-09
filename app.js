const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views', 'pages'));

app.get('/', (_req, res) => {
  res.status(200).render('home');
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'ping' });
});

module.exports = { app };
