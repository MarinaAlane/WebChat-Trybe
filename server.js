// ..source: https://socket.io/get-started/chat

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
