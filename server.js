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

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

      socket.on('disconnect', () => {
        userController.deleteUser(socket);
       io.emit('users', userController.getUsers());
    });
    socket.on('adduser', (radomString) => {
        userController.addUser(radomString, socket);
        io.emit('users', userController.getUsers());
    });
    socket.on('nickname', (nickname) => {
        userController.editUser(nickname, socket);
        io.emit('users', userController.getUsers());
    }); 
    socket.on('message', (msg) => {
      const { nickname, chatMessage } = msg;
        const printDados = dateController.getDate(nickname, chatMessage);
        io.emit('message', printDados);
    });
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
    console.log('listening on 3000');
});
