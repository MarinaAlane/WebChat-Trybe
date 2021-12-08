const axios = require('axios');
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

let users = [];

io.on('connection', (socket) => {
  let username = socket.id.substring(0, 16); users.push(username);

  socket.on('connected', () => {
    socket.emit('userId', username);
    io.emit('id', { newId: username, olderId: '' }); io.emit('users', { users });
  });

  socket.on('id', (id) => {
    io.emit('id', id); const filtered = users.filter((user) => user !== id.olderId);
    socket.emit('userId', id.newId);
    users = filtered; users.push(id.newId); username = id.newId; io.emit('users', { users });
  });

  socket.on('disconnect',
    () => { users = users.filter((user) => user !== username); io.emit('users', { users }); });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('en-GB');
    const formatedDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`); axios
      .post('http://localhost:3000', { message: chatMessage, timestamp: formatedDate, nickname });
  });
});

const { saveMessage, getAllMessages } = require('./controllers/messages');

app.post('/', saveMessage);

app.get('/messages', getAllMessages);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

http.listen(3000, () => {
  console.log(`Listening at port: ${3000}`);
});
