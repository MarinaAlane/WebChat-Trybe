const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const port = 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

const messages = [];
let users = [];

const io = socketIo(server);

io.on('connection', (socket) => {
  let userName = socket.id.substring(0, 16);
  users.push(userName);
  // socket.emit('update_messages', messages);
  socket.emit('update_users', users);
  socket.broadcast.emit('new_user', userName);
  
  // socket.on('new_user', () => {
  // });

  socket.on('update_user', (data) => {
    users = users.map((user) => (user === data.lastName ? data.user : user));
    userName = data.user;
    socket.broadcast.emit('update_logged_users', data);
    // io.emit('update_messages', messages);
  });

  socket.on('new_message', (data) => {
    messages.push(data);
    // io.emit('update_users', users);
    io.emit('message', messages);
  });
});
