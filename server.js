require('dotenv').config();
const express = require('express');
// const cors = require('cors');

const app = express();
app.use(express.json());
const http = require('http').createServer(app);

const userList = [];

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

// app.use(cors());

const userController = require('./controllers/userController');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/messages', async (req, res) => {
    const messages = await userController.getAll();
    res.status(200).json(messages);
});

// app.use(express.static(`${__dirname}/index.html`));

const dateNow = new Date().toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      await userController.createMessage(chatMessage, nickname, dateNow);
      io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
    });
  
  socket.on('userConnected', (nickname) => {
    userList.push({ nickname, id: socket.id });
    io.emit('updateList', userList);
  });
  
  socket.on('nickUpdate', ({ nickname, oldNick }) => {
    const index = userList.findIndex((i) => i.nickname === oldNick);
    userList.splice(index, 1, { nickname, id: socket.id });
    io.emit('updateList', userList);
  });
  
    socket.on('disconnect', ({ id }) => {
    const index = userList.findIndex((user) => user.id === id);
    userList.splice(index, 1);
      io.emit('updateList', userList);
    });
  });

http.listen(3000, () => {
    console.log('listening on 3000');
});