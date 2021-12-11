const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const { getMessages } = require('./controllers/chatController');
const { postMessage } = require('./models/chatModel');

const onlineUsers = [];
const date = moment().format('DD-MM-yyyy HH:mm:ss A');

// Função para alterar apelido do usuário
const updateNickname = (updatedUser) => {
  const findUser = onlineUsers.findIndex((user) => user.id === updatedUser.id);
  onlineUsers.splice(findUser, 1);
  onlineUsers.push(updatedUser);
  return onlineUsers;
};

// Remover um usuário da lista quando ele desconectar
const removeUser = (id) => {
  const disconnectUser = onlineUsers.findIndex((user) => user.id === id);
    onlineUsers.splice(disconnectUser, 1);
  return true;
};

io.on('connection', async (socket) => {
  const newUser = { id: socket.id, nickname: socket.id.substring(0, 16) };
  onlineUsers.push(newUser);
  io.emit('connectedUsers', onlineUsers);
  socket.on('nickname', (updatedUser) => {
    const updatedList = updateNickname(updatedUser);
    io.emit('connectedUsers', updatedList);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    await postMessage(chatMessage, nickname, date);
    io.emit('message', `${date} ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('connectedUsers', onlineUsers);  
  });
});

app.use(cors());
app.get('/', getMessages);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
