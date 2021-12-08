// ..source: https://socket.io/get-started/chat

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const messageController = require('./controller/message');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (_req, res) => {
  const allMessages = await messageController.getAll();
  res.render(`${__dirname}/views/index`, { allMessages });
});

io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    const message = await messageController.createMessage(msg);
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
