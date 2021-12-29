require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);

const urlOrigin = `http://localhost:${PORT}`;

const socket = require('socket.io')(server, {

  cors: {

    methods: ['GET', 'POST'],
    
    origin: urlOrigin,

  },

});

app.use(cors());

require('./sockets/chat')(socket);

app.use(express.static(path.join(__dirname, 'views')));

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/', (_req, res) => res.render('chat'));

server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});
