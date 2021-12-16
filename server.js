const express = require('express');
// const path = require('path');
const moment = require('moment');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const users = [];

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('new connection');
  const idUser = socket.id.substring(0, 16);
  users.push(idUser);
  socket.broadcast.emit('id_User', idUser);
  socket.emit('connect_user', users);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(chatMessage, nickname);
    const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const port = 3000;

http.listen(3000, () => {
  console.log(`listen port ${port}`);
});