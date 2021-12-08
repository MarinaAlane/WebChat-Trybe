const express = require('express');
const cors = require('cors');
const path = require('path');

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
  console.log('connection');
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleDateString('en-GB');
    const formateDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formateDate} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './src/view/index.html'));
});