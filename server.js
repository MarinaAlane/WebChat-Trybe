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

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });

    // Req 1: Back-end (server) receives information from the front-end (client), stores, organizes, generates a concatenated string and returns it to the front-end (client):
    socket.on('message', (msg) => {
        // console.log('message: ', msg);
        const dateHour = moment().format('DD-MM-YYYY HH:mm:ss');
        // console.log(dateHour);
        const chatLine = `${dateHour} - ${msg.nickname}: ${msg.chatMessage}`;
        // console.log(chatLine);
        io.emit('message', chatLine);
    });
    socket.emit('user', socket.id.slice(0, 16));
});

server.listen(PORT, () => console.log(`Server conected on port ${PORT}!`));
