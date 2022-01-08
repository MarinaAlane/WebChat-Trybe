const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

server.listen(PORT, () => console.log(`Server conected on port ${PORT}!`));
