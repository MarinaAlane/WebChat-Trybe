// Faça seu código aqui
require('dotenv').config();

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const http = require('http').createServer(app);

const { PORT = 3000 } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const moment = require('moment');

io.on('connection', (socket) => {
  let username = socket.id.slice(-16);

  socket.emit('setUsername', username);

  socket.broadcast.emit('addLoggedUser', username);

  socket.on('addLoggedUser', (data) => {
    socket.broadcast.emit('addMissingLoggedUser', data);
  });

  socket.on('updateUsername', (data) => {
    io.emit('updateUsername', { oldUsername: username, newUsername: data });
    username = data;
  });

  socket.on('disconnect', () => {
    io.emit('removeUser', username);
  });
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment();
    const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });
});

const rootRouter = require('./routes');

app.use(rootRouter);

http.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));