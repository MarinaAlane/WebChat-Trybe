const express = require('express');

const app = express();

const http = require('http');
const path = require('path');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const moment = require('moment');

const { insertChatMessage, getChatHistory } = require('./models/chatModel');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let onlineUsers = [];
// eslint-disable-next-line max-lines-per-function
io.on('connection', async (socket) => {
  socket.emit('userOnline', socket.id.slice(0, 16));
  // console.log(onlineUsers);

  socket.on('nick', (nickname) => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    onlineUsers.push({ nickname, id: socket.id });
    io.emit('user', onlineUsers);
  });

  const test = await getChatHistory();
  test.forEach((line) => socket.emit('history', line));
 
  socket.on('message', async (msg) => { 
    // socket.on escuta somente a mensagem do usuario emissor.
      const date = moment().format('DD-MM-YYYY HH:mm:ss');
      const chatLine = `${date} - ${msg.nickname}: ${msg.chatMessage}`;
      const chatMessage = { timestamp: date, nickname: msg.nickname, message: msg.chatMessage };
      await insertChatMessage(chatMessage);
      io.emit('message', chatLine); // io.emit emite a todos a mensagem que foi enviada por um usuario
  });

  socket.on('disconnect', () => {
    console.log('usuario desconetou');
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    console.log(onlineUsers);
    io.emit('user', onlineUsers);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});