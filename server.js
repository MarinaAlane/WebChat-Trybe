const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const port = 3000;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const messages = [];

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('new connection');
  socket.emit('update_messages', messages);

  socket.on('new_message', (data) => {
    messages.push(data);
    socket.emit('update_messages', messages);
  });
});
