const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');
const Messages = require('./controllers/Messages');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const online = [];

io.on('connection', async (socket) => {
  const { id } = socket;
  const baseNickname = id.slice(0, 16);
  const list = await Messages.getAll();

  online.push({ id, nickname: baseNickname });
  socket.emit('newUser', baseNickname);
  
  socket.on('message', async (message) => {
    const date = moment().format('DD-MM-YYYY, hh:mm:ss');
    const completeMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', completeMessage);
    await Messages.create(message.nickname, message.chatMessage, date);
  });
  
  socket.on('saveNick', (nickname) => {
    const index = online.findIndex((user) => user.id === socket.id);
    online[index].nickname = nickname;
    io.emit('users', online);
  });

  socket.on('users', () => {
    console.log(online);
    io.emit('users', online);
  });

  socket.on('disconnect', () => {
    const index = online.findIndex((user) => user.id === socket.id);
    online.splice(index, 1); 
    io.emit('users', online); 
  });

  socket.emit('getMessages', list);
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
