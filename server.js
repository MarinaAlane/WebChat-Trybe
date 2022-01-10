const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

const { setMessage, getMessages } = require('./models/molelChat');

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

const getAllMessage = async (socket) => {
  const allChat = await getMessages();
  allChat.forEach((chat) => socket.emit('history', chat));
};

let listOnlineUsers = [];

io.on('connection', async (socket) => {
  socket.emit('usersOnline', socket.id.slice(0, 16));

  await getAllMessage(socket);

  socket.on('name', (userName) => {
    listOnlineUsers = listOnlineUsers.filter((userOnline) => userOnline.id !== socket.id);
    listOnlineUsers.push({ nickname: userName, id: socket.id });
    console.log(listOnlineUsers);
    io.emit('user', listOnlineUsers);
  });

  const dateFormat = moment().format('DD-MM-yyyy hh:mm:ss A');
  socket.on('message', async ({ nickname, chatMessage }) => {
    await setMessage({ timestamp: dateFormat, nickname, message: chatMessage });
    io.emit('message', `${dateFormat} - ${nickname}:${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
    listOnlineUsers = listOnlineUsers.filter((userOnline) => userOnline.id !== socket.id);
    io.emit('user', listOnlineUsers);
  });
});
server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));