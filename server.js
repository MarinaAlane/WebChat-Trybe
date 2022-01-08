const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chat = require('./sockets/chat');

chat(io);

const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.startChat);

http.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});