const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getAllMessages } = require('./controller/messages');
const { create } = require('./models/messages');

const allOnlineUsers = [];
const date = moment().format('DD-MM-yyyy HH:mm:ss A');

const updateList = (updatedUser) => {
  const User = allOnlineUsers.findIndex((user) => user.id === updatedUser.id);
  allOnlineUsers.splice(User, 1);
  allOnlineUsers.push(updatedUser);
  return allOnlineUsers;
};
const updatedByRemoveList = (id) => {
  const disconnectedUser = allOnlineUsers.findIndex((user) => user.id === id);
    allOnlineUsers.splice(disconnectedUser, 1);
  return true;
};

io.on('connection', async (socket) => {
  const newUser = { id: socket.id, nickname: socket.id.substring(0, 16) };
  allOnlineUsers.push(newUser);
  io.emit('conectedUsers', allOnlineUsers);

  socket.on('nickname', (updatedUser) => {
    const updatedList = updateList(updatedUser);
    io.emit('conectedUsers', updatedList);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    await create(chatMessage, nickname, date);
    io.emit('message', `${date} ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    updatedByRemoveList(socket.id);
    io.emit('conectedUsers', allOnlineUsers);  
  });
});

app.use(cors());
app.get('/', getAllMessages);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

/* Projeto utilizado como referência para dúvidas pontuais,
de Carol Vasconcelos - T10:
https://github.com/tryber/sd-010-a-project-webchat/pull/26/files */
