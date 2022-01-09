const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);
const moment = require('moment');

const { rescueHistoryOnDB, saveMsgOnDB } = require('./models/chatHistory');

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Req. 03
async function rescueHistory(socket) {
    const chatHistory = await rescueHistoryOnDB();
    console.log(chatHistory);
    chatHistory.forEach((dataInfo) => socket.emit('history', dataInfo));
}

let onlineUsers = [];

// Req. 04
io.on('connection', async (socket) => {
    // console.log(`User ${socket.id} connected`);
    socket.emit('userOnline', socket.id.slice(0, 16));
    // console.log(onlineUsers);

    // Req. 04
    socket.on('nick', (userNickName) => {
        onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
        onlineUsers.push({ userNickName, id: socket.id });
        // console.log(userNickName);
        // console.log(onlineUsers);
        io.emit('usersOnline', onlineUsers);
    });

    // Req. 03
    rescueHistory(socket);

    // Req 1: Back-end (server) receives information from the front-end (client), stores, organizes, generates a concatenated string and returns it to the front-end (client):
    socket.on('message', async (msg) => {
        // console.log('message: ', msg);
        const dateHour = moment().format('DD-MM-YYYY HH:mm:ss');
        // console.log(dateHour);
        const chatToFront = `${dateHour} - ${msg.nickname}: ${msg.chatMessage}`;
        // Req. 03
        const chatToDB = { timestamp: dateHour, nickname: msg.nickname, message: msg.chatMessage };
        await saveMsgOnDB(chatToDB);
        io.emit('message', chatToFront);
    });

    // Req. 04
    socket.on('disconnect', () => {
        // console.log(`User ${socket.id} disconnected`);
        onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
        // console.log(onlineUsers);
        io.emit('usersOnline', onlineUsers);
    });
});

server.listen(PORT, () => {
    console.log(`Server conected on port ${PORT}!`);
    console.log(onlineUsers);
});
