const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors());

app.use('/', express.static(path.join(__dirname, 'view')));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
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
  res.status(200).sendFile(path.join(__dirname, '/src/view/index.html'));
});

http.listen(port, () => {
  console.log('Escutando na port %s', port);
});
