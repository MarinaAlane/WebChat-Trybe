// Faça seu código aqui
const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  let nick = socket.id.substring(0, 16);

  socket.emit('firstId', nick);

  socket.on('changeFirstId', (id) => {
    nick = id; io.emit('firstId', nick);
  });

  socket.emit('greeting', nick);

  socket.on('nickname', (user) => {
    socket.emit('greeting', `Bem-vindo ${user}`);
    socket.broadcast.emit('greeting', `Usuário conectado. Name: ${user}`);
  });

  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = moment(new Date()).format('DD-MM-yyyy h:mm:ss A'); // Problem solved using src: https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  // socket.on('disconnect', () => {
  //   socket.emit('disconnect', `Usuário ${nick} se desconectou!`);
  // });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo ${PORT}`);
});