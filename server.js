// Faça seu código aqui 
const express = require('express');
const moment = require('moment');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.render('index');
});

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

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
    io.emit('userList', Object.values(onUsers));
  io.emit('history', await msgs);
});

http.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});