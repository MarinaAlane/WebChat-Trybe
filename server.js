const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
    cors: {
      origin: `http://localhost:${PORT}`,
      methods: ['GET', 'POST'],
    } });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('board');
});

io.on('connection', (socket) => {
  socket.on('message', (post) => {
    const { nickname, chatMessage } = post;
    const data = moment().format('DD-MM-yyyy HH:mm:ss A');
    const message = `${data} - ${nickname} ${chatMessage}`;
    io.emit('message', message);
  });
});

http.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
}); 