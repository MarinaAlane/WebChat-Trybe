const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { saveChat, findMessages } = require('./models/chatModel');
const dataConfig = require('./dateConfig');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const { formatDate } = dataConfig;

const listUsers = [];

io.on('connection', async (socket) => {
    const allMessages = await findMessages();
    socket.emit('dbMessages', allMessages);

    socket.on('message', async (msg) => {
        const { nickname, chatMessage } = msg;
        const saveMessages = await saveChat(nickname, chatMessage, formatDate);
        io.emit('message', `${formatDate} ${nickname}: ${chatMessage}`);
        console.log('Mensagens salvas', saveMessages);
    });
    socket.on('onlineUserOn', (msg) => {    
        listUsers.push(msg);
        io.emit('onlineUserOn', { mensagem: msg, socket: socket.id, listUsers });
    });

    socket.on('newNickName', (msg) => {
        io.emit('newNickName', { newNick: msg, socket: socket.id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconectou', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));