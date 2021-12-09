const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

app.use(cors());

const userController = require('./users');
const dateController = require('./date');
const userModel = require('./models/userModel');

const disconnect = (socket) => {
    socket.on('disconnect', () => {
        io.emit('users', userController.deleteUser(socket));
    });
};

const addUser = (socket) => {
    socket.on('adduser', (radomString) => {
        io.emit('users', userController.addUser(radomString, socket));
    });
};

const addNickname = (socket) => {
    socket.on('nickname', (nickname) => {
        io.emit('users', userController.editUser(nickname, socket));
    }); 
};

const sendMessage = (socket) => {
    socket.on('message', async (message) => {
          const printDados = dateController.getDate(message.nickname, message.chatMessage);
          await userModel.create(message);
          io.emit('message', printDados);
    });
};

    io.on('connection', async (socket) => {
        console.log('connected', socket.id);
        const history = await userModel.getAll();
        console.log(history);
        io.emit('history', history);
        disconnect(socket);
        addUser(socket);
        addNickname(socket);
        sendMessage(socket);
    });

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
    console.log('listening on 3000');
});
