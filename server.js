const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');
const utils = require('./utils');
const model = require('./models/modelMessages');

const app = express();
const PORT = 3000;
const appServer = http.createServer(app);
const io = new Server(appServer);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let arrayUsers = [];

io.on('connection', (socket) => {
/*   socket.on('message', (msg) => {
    // const dtMsg = utils.dataMessageGenerate();
    const dateTime = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${dateTime} - ${msg.nickname}: ${msg.chatMessage}`);
    await model.createMessage({ message: msg.chatMessage, nickname: msg.nickname, timestamp: dateTime });
  }); */
  const randomName = utils.randomNameGenerate();

  const objUser = { nickname: randomName, id: socket.id };
  socket.on('newNickname', () => {
    utils.createArrayUsers(arrayUsers, objUser);
    socket.emit('nickname', arrayUsers);
    socket.broadcast.emit('updateOnlineUsers', arrayUsers);
  });

  socket.on('uptadeNickname', (obj) => {
    arrayUsers = utils.updateNickname(arrayUsers, obj);
    io.emit('updateOnlineUsers', arrayUsers);
  });

  socket.on('disconnect', () => {
    arrayUsers = utils.removeUser(arrayUsers, objUser);
    io.emit('nickname', arrayUsers);
  });
});

io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    // const dtMsg = utils.dataMessageGenerate();
    const dateTime = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${dateTime} - ${msg.nickname}: ${msg.chatMessage}`);
    await model.createMessage({
      message: msg.chatMessage,
      nickname: msg.nickname,
      timestamp: dateTime,
    });
  });

  socket.on('chatHistory', async () => {
    const messages = await model.getAllMessages();
    socket.emit('chatHistory', messages);
  });
});

appServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));