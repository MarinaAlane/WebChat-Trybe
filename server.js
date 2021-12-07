const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const port = 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

const messages = [];
const users = [];

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('new connection');
  socket.emit('update_messages', messages);

  socket.on('new_user', (data) => {
    console.log(data);
    users.push(data);
    io.emit('update_users', users);
    io.emit('update_messages', messages);
  });

  socket.on('new_message', (data) => {
    console.log(data);
    messages.push(data);
    io.emit('update_users', users);
    io.emit('update_messages', messages);
  });
});
