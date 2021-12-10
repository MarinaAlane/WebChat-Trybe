require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const http = require('http').createServer(app);

const list = [];

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

const userController = require('./controllers/userController');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/messages', async (req, res) => {
    const messages = await userController.getAll();
    res.status(200).json(messages);
});

// app.use(express.static(`${__dirname}/index.html`));

const data = new Date().toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      await userController.createMessage(chatMessage, nickname, data);
      io.emit('message', `${data} - ${nickname} ${chatMessage}`);
    });
  
  socket.on('user', (nickname) => {
    list.push({ nickname, id: socket.id });
    io.emit('onlineList', list);
  });
  
  socket.on('changeNick', ({ nickname, oldNick }) => {
    const index = list.findIndex((item) => item.nickname === oldNick);
    list.splice(index, 1, { nickname, id: socket.id });
    io.emit('onlineList', list);
  });
  
    socket.on('disconnect', ({ id }) => {
    const index = list.findIndex((user) => user.id === id);
    list.splice(index, 1);
      io.emit('onlineList', list);
    });
  });

http.listen(3000, () => {
    console.log('listening on 3000');
});