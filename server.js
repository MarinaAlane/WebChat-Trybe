const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/', express.static(path.join(__dirname, 'public')));

const serve = app.listen(port, () => console.log(`Example app listening on port %s`, port));

const io = socketIo(serve);

io.on('connection', (socket) => {
  console.log("new connection");
  socket.emit('update_messages', getAllMessages());
  socket.on('new_message', (data) => {
  
  
    socket.emit('update_messages', getAllMessages());
  });
});
