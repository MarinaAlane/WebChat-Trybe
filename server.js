const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString().replaceAll('/', '-');
    const message = `${date} - ${(nickname === '') ? 'sem nome' : nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});

server.listen(3000, () => console.log('Servidor online em localhost:3000'));