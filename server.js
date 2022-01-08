const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment'); 

const app = express();
const { PORT = 3000 } = process.env;
const server = http.createServer(app);
const io = new Server(server);

const users = {};

app.use(express.static(`${__dirname}/public`));

const currentDate = moment().format('DD-MM-yyyy hh:mm:ss A'); 

io.on('connection', (socket) => {
  const i = socket.id.slice(0, -4);
  users[socket.id] = i;
  io.emit('userName', i, users);
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${currentDate} - ${users[nickname]} ${chatMessage}`);
  }); 
  socket.on('newNick', (nick) => {
    users[socket.id] = nick;
    io.emit('userName', i, users);
  });
});

server.listen(PORT, () => console.log(`Funicionando na porta ${PORT}`));
