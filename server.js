// Faça seu código aqui 
const express = require('express');
const moment = require('moment');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// configurar a entrada e saíde de dados
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

  app.use(express.static('views'));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:mm:ss a');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (_req, res) => {
  res.render('index');
});

http.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});