const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');
const { saveChat, findMessages, alterName } = require('./models/chatModel');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

let listUsers = [];

io.on('connection', async (socket) => {
    const allMessages = await findMessages();
    socket.emit('dbMessages', allMessages);

    socket.on('message', async (msg) => {
        const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
        const { nickname, chatMessage } = msg;
        await saveChat(nickname, chatMessage, timestamp);
        io.emit('message', `${timestamp} ${nickname}: ${chatMessage}`);
    });
    socket.on('onlineUserOn', (msg) => {
        listUsers.push(msg);
        io.emit('onlineUserOn', listUsers);
    });
});

io.on('connection', (socket) => {
    socket.on('newNickName', async (msg) => {
        const { userModify, userActual } = msg;
        const newMessage = await alterName(userActual, userModify);
        console.log(newMessage);
        const allMessages = await findMessages();
        socket.emit('dbMessages', allMessages);
        const indice = listUsers.indexOf(userActual);
        listUsers.splice(indice, 1, userModify);
        io.emit('onlineUserOn', listUsers);
        // io.emit('newNickName', { userActual, userModify });
    });

    // Quando o usuário ativo desconecta...
    socket.on('disconnect', () => {
            listUsers = [];
            socket.broadcast.emit('disconectou');
    });

    socket.on('desconectado', (msg) => {
        listUsers.push(msg);
        io.emit('onlineUserOn', listUsers);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));