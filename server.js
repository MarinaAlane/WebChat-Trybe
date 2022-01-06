const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const moment = require('moment');
const Chat = require('./models/Chat');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.id} conectou`);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment();
    const formatedDate = date.format('DD-MM-yyyy hh:mm:ss A');

    await Chat.create({
      message: chatMessage,
      nickname,
      timestamp: formatedDate,
    });
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
  });

  socket.emit('history', await Chat.getAll());

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
