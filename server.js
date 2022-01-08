const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);
const moment = require('moment');

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('message', (msg) => {
        // console.log('message: ', msg);
        const dateHour = moment().format('DD-MM-YYYY HH:mm:ss');
        // console.log(dateHour);
        const chatLine = { dateHour, nickname: msg.nickname, msgField: msg.msgField };
        console.log(chatLine);
        io.emit('message', chatLine);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

server.listen(PORT, () => console.log(`Server conected on port ${PORT}!`));
