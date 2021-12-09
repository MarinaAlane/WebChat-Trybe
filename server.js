const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});

const fetchApi = require('./src/controller/chatController');

app.use('/', fetchApi);

let user = [];

const createNewUser = (nickname, chatMessage) => {
  const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);

    axios.post('http://localhost:3000/chat', {
      message: chatMessage,
      nickname,
      timestamp: date,
    });
};

io.on('connection', (socket) => {
  console.log('connection');
  let idSocket = socket.id.substring(0, 16);
  user.push(idSocket);

  socket.broadcast.emit('id', idSocket);

  socket.emit('connection_NewUSer', user);

  socket.on('message', ({ chatMessage, nickname }) => {
    createNewUser(chatMessage, nickname);
  });

  socket.on('alter_user', ({ newUser, oldUser }) => {
    idSocket = newUser;
    user = user.map((users) => (users === oldUser ? newUser : users));
    
    socket.broadcast.emit('update_user', { newUser, oldUser });
  });

  socket.on('disconnect', () => {
    user = user.filter((users) => users !== idSocket);
    socket.broadcast.emit('user_disconnect', idSocket);
  });
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/src/view/index.html'));
});

http.listen(port, () => {
  console.log('Escutando na port %s', port);
});
