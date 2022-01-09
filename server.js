const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');
const { saveChat, findMessages } = require('./models/chatModel');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

const listUsers = [];

io.on('connection', async (socket) => {
    const allMessages = await findMessages();
    socket.emit('dbMessages', allMessages);

    socket.on('message', async (msg) => {
        const { nickname, chatMessage } = msg;
        const saveMessages = await saveChat(nickname, chatMessage, timestamp);
        io.emit('message', `${timestamp} ${nickname}: ${chatMessage}`);
        console.log('Mensagens salvas', saveMessages);
    });
    socket.on('onlineUserOn', (msg) => {
        listUsers.push(msg);
        io.emit('onlineUserOn', { listUsers });
    });
});

io.on('connection', async (socket) => {
    socket.on('newNickName', (msg) => {
        const { userModify, userActual } = msg;
        const indice = listUsers.indexOf(userActual);
        listUsers.splice(indice, 1, userModify);
        io.emit('newNickName', { userActual, userModify });
    });

    socket.on('disconnect', () => {
            socket.broadcast.emit('disconectou');
    });

    socket.on('desconectado', (msg) => {
        // const indice = listUsers.indexOf(msg);
        // console.log(indice);
        // listUsers.splice(indice, 1);
        // console.log('modificado');
        console.log('USUÁRIO QUE DESCONECTOU', msg);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));