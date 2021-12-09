const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
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

let user = [];

io.on('connection', (socket) => {
  console.log('connection');
  const idSocket = socket.id.substring(0, 16);
  user.push(idSocket);

  socket.broadcast.emit('id', idSocket);

  socket.emit('connection_NewUSer', user);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
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
