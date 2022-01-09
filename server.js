// Faça seu código aqui

const express = require('express');
const cors = require('cors');
const path = require('path'); //

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/frontend`));

const http = require('http').createServer(app);

const PORT = 3000;

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

require('./backend/socket')(io);

app.get('/', (_req, res) => {
  res.render('chat');
  // res.sendFile(path.join(__dirname, '/views/chat.html'));
});

app.get('/ping', (_req, res) => res.send('PONG!'));

http.listen(PORT, () => console.log(`Running Wechat in ${PORT} port`));