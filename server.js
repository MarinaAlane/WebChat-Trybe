// ..source: https://socket.io/get-started/chat

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { createMessage } = require('./middleware/manageMessage');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => {
  res.render(`${__dirname}/views/index`);
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const message = createMessage(msg);
    io.emit('message', message);
  });
  socket.on('connectUser', (msg) => {
    io.emit('connectUser', msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
