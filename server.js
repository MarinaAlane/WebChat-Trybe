const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
// const { chatRender } = require('./controller/chatControlle');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectou`);
  
  const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
  
  socket.on('message', (message) => {
    console.log('message', message);
    const { chatMessage, nickname } = message;
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    console.log('message', message);
  });

  socket.on('disconnect', () => console.log(`Usuário ${socket.id} desconectou`));
});

const PORT = 3000;

server.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
