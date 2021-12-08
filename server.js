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

let arr = [];

io.on('connection', (socket) => {
  // socket.emit('returnAllMessages', async () => axios.get('http://localhost:3000/chat'));
  let userName = socket.id.substring(0, 16);

  arr.push(userName);

  socket.emit('id', arr);

  socket.on('log_user', (id) => socket.broadcast.emit('login_user', id));

  socket.on('change_nickname', ({ userNickName, nick }) => {
    arr = arr.map((el) => (el === nick ? userNickName : el));
    socket.emit('change_user_id', userNickName); userName = userNickName;
    socket.broadcast.emit('change_one_user_id', { userNickName, nick });
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
  socket.on('disconnect', () => {
    arr = arr.filter((el) => (el !== userName));
    socket.broadcast.emit('disconnect_user', userName);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3000, () => {
  console.log(`Listening at port: ${3000}`);
});