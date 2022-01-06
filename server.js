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
  socket.emit('setUsername', socket.id.slice(-16));
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment();
    const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });
});

const rootRouter = require('./routes');

app.use(rootRouter);

http.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));