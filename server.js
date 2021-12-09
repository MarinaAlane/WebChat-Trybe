// Faça seu código aqui 
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

const { findAllMessages } = require('./models/messages');
const { makeId } = require('./utils/stringGenerator');

app.use(express.static(path.join(__dirname, '/public')));

require('./sockets/messages')(io);

app.get('/', async (req, res) => {
const allMessages = await findAllMessages();
 const randomNick = makeId(16);
 res.status(200).render('chat.ejs', { randomNick, allMessages });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
}); 