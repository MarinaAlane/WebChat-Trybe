// Faça seu código aqui
const randomString = require('randomstring');

const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let users = [];

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on('connection', (socket) => {
  const randomNickname = randomString.generate(16);
  users.push({ socketId: socket.id, nickname: randomNickname });
  io.emit('users', users);

  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('users', users);
  });

  socket.on('updateUser', (newNickname) => {
    users = users.map((user) => {
      if (user.socketId === socket.id) {
        return { socketId: user.socketId, nickname: newNickname };
      }
      return user;
    });
    io.emit('users', users);
  });
});

require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', async (req, res) => {
  res.status(200).render('chat.ejs');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
