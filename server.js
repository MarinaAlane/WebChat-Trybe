// ..source: https://socket.io/get-started/chat

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { createMessage } = require('./middleware/manageMessage');

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const message = createMessage(msg);
    io.emit('message', message);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
