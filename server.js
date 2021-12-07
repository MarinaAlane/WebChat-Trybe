// Faça seu código aqui
const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const chatController = require('./controller/chatController');

const app = express();

const port = 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', chatController);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('user_connect', ({ nickname }) => {
    socket.broadcast.emit('login_user', nickname);
    socket.emit('logged_user', nickname);
  });
  socket.on('send-message', (obj) => {
    io.emit('message_user', obj);
  });
});
