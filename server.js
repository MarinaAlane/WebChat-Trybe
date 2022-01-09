const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});
const { newMessage } = require('./models/messagesModel');
const userRoutes = require('./routes/user.routes');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', userRoutes);

let currentOnline = [];
const changeNickname = (id, newNickname) => {
  const userIndex = currentOnline.findIndex((user) => user.id === id);
  currentOnline[userIndex].nickname = newNickname;
};

io.on('connection', (socket) => {
  currentOnline.push({ id: socket.id, nickname: socket.id.substring(0, 16) });
  socket.emit('connected', socket.id.substring(0, 16));
  io.emit('updateUsersList', currentOnline);
  socket.on('message', async ({ nickname, chatMessage }) => {
    const currentDate = moment().format('DD-MM-YYYY HH:MM:ss A');
    const changeNickName = nickname || socket.id;
    await newMessage({ message: chatMessage, nickname, timeStamps: currentDate });
    io.emit('message', `${currentDate} ${changeNickName}: ${chatMessage}`);
  });
  socket.on('updateNickname', (nickname) => {
    changeNickname(socket.id, nickname);
    io.emit('updateUsersList', currentOnline);
  });
  socket.on('disconnect', () => {
    currentOnline = currentOnline.filter((user) => user.id !== socket.id);
    io.emit('updateUsersList', currentOnline);
  });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
