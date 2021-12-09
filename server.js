// Faça seu código aqui 
const express = require('express');
const http = require('http');
const path = require('path');
const moment = require('moment');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const onUsers = {};
const { getMsg, setMsg } = require('./models/webchat');

io.on('connection', async (socket) => {
  onUsers[socket.id] = socket.id.substring(0, 16);
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:mm:ss a');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    await setMsg({ date, nickname, chatMessage });
  });

  socket.on('altName', (nickname) => {
    onUsers[socket.id] = nickname;
    io.emit('userList', Object.values(onUsers)); // Object.values para percorrer este objeto
  });
  
  socket.on('disconnect', () => {
    delete onUsers[socket.id];
    io.emit('userList', Object.values(onUsers)); // Object.values para percorrer este objeto
    console.log(`usuário ${socket.id} desconectou`);
  });

    const msgs = await getMsg();

  io.emit('history', await msgs);
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));