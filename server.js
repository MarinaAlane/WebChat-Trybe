const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});
const router = require('./router');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/views')));
app.use(router);
app.use(cors());

require('./sockets/message')(io);
require('./sockets/nickname')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
