const express = require('express');
const http = require('http');
const { Server } = require('socket.io')
const {format} = require('date-fns');
const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
  console.log('user', socket.id, 'conectou');

  // onlineUsers.addUser(socket.id);
  // const list = onlineUsers.getList();
  // io.emit('render-online-users', list);

  socket.on('message', ({ chatMessage, nickname }) => {
    const newMessage = `${timestamp} ${nickname}: ${chatMessage}`

    // console.log(newMessage);
    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    // onlineUsers.delUser(socket.id)
    // io.emit('del-user', socket.id);
    console.log('user', socket.id, 'desconectou');
  });
});
server.listen(3000, () => {
  console.log('server na porta 3000');
});
