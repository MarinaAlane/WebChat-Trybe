// Faça seu código aqui
const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const axios = require('axios');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'view')));

let usersOnline = [];

io.on('connection', (socket) => {
  let nick = socket.id.substring(0, 16); usersOnline.push(nick);
  socket.emit('firstId', usersOnline); socket.broadcast.emit('online', nick);

  socket.on('changeFirstId', (id, oldId) => {
    nick = id;
    usersOnline = usersOnline.map((e) => (e === oldId ? id : e));
    socket.broadcast.emit('changeId', nick, oldId);
  });

  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = moment(new Date()).format('DD-MM-yyyy h:mm:ss A'); // Problem solved using src: https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    axios.post('http://localhost:3000/chat', { message: chatMessage, timestamp, nickname });
  });
  
  socket.on('disconnect', () => {
    socket.broadcast.emit('offline', `${nick} se desconectou`);
    usersOnline = usersOnline.filter((id) => (id !== nick));
    io.emit('firstId', usersOnline);
  });
});

const messagesController = require('./controllers/messagesController');

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/chat', messagesController.getAll);

app.post('/chat', messagesController.createMessage);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo ${PORT}`);
});