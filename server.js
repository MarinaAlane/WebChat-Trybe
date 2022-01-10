const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { generateDate } = require('./utility/date');
const { getFullChat } = require('./controllers/chatMessages');
const { createMessages } = require('./models/chat');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', getFullChat);

const listUsers = {};

io.on('connection', (socket) => {
  const currentDate = generateDate();
  listUsers[socket.id] = socket.id.substr(0, 16);

  socket.emit('firstUser', listUsers[socket.id]);

  io.emit('listUsers', listUsers);

  socket.on('message', async ({ chatMessage, nickname }) => {
    await createMessages(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} ${nickname}: ${chatMessage}`);
  });

  socket.on('rename', (renamed) => {
    listUsers[socket.id] = renamed;
    io.emit('listUsers', listUsers);
  });

  socket.on('disconnect', () => {
    delete listUsers[socket.id];

    io.emit('listUsers', listUsers);
  });
});
