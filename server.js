require('dotenv').config();
const express = require('express');
const path = require('path');

// Atualiza PR :P
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const MessagesController = require('./controllers/MessagesController');

app.use(express.static(path.resolve(__dirname, 'public')));

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', MessagesController.getAll);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
