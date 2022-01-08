const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment'); 

const app = express();
const { PORT = 3000 } = process.env;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(`${__dirname}/public`));

const currentDate = moment().format('DD-MM-yyyy hh:mm:ss A'); 

io.on('connection', (socket) => {
  io.emit('connection', socket.id);
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${currentDate} - ${nickname} ${chatMessage}`);
  }); 
});

server.listen(PORT, () => console.log(`Funicionando na porta ${PORT}`));
