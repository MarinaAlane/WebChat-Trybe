// const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const arr = [];

io.on('connection', (socket) => {
  // socket.emit('returnAllMessages', async () => axios.get('http://localhost:3000/chat'));

  arr.push(socket.id.substring(0, 16));

  socket.emit('id', arr);

  socket.on('log_user', (id) => {
    socket.broadcast.emit('login_user', id);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('en-GB');
    const formatedDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    // axios.post('http://localhost:3000/chat', {
    //   message: chatMessage,
    //   timestamp: formatedDate,
    //   nickname,
    // });
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3000, () => {
  console.log(`Listening at port: ${3000}`);
});