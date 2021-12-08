const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors());

const io = require('socket.io')(http,  {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleDateString('en-GB');
    const formateDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formateDate} - ${nickname}: ${chatMessage}`);
  });
});