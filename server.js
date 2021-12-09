const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors());

// app.use('/', express.static(path.join(__dirname, 'view')));

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});

const user = [];

io.on('connection', (socket) => {
  console.log('connection');
  const idSocket = socket.id;
  user.push(idSocket);
  socket.emit('id', user);
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleDateString('en-GB');
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const seg = new Date().getSeconds();
    const formateDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formateDate} ${hours}:${min}:${seg} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/src/view/index.html'));
});

http.listen(port, () => {
  console.log('Escutando na port %s', port);
});
