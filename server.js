// config das live lectures com o mestre frankkkk
// https://momentjs.com/docs/ moment.format

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const { PORT = 3000 } = process.env;

let conectedUsers = [];

function stringGenerator(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let generatedString = '';

    for (let i = 0; i < length; i += 1) {
        generatedString += characters[Math.floor(Math.random() * characters.length)];
    }
    return generatedString;
}

const app = express();

const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});
const history = require('./models/history');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
    cors({
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization'],
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const historyMessage = await history.historyMessages();
    res.render('home.ejs', { history : historyMessage });
});

io.on('connect', async (socket) => {
    const randomUsername = stringGenerator(16);
    socket.emit('username', randomUsername);
    conectedUsers.push({ nickname: randomUsername, socketId: socket.id });
    io.emit('online', conectedUsers);
    socket.on('message', async (data) => {
        const date = moment().format('DD-MM-yyyy HH:mm:ss');
        await history.send({ message: data.chatMessage, nickname: data.nickname, timestamp: date });
        io.emit('message', `${date} - ${data.nickname}: ${data.chatMessage}`);
    });
    socket.on('updateNickname', (data) => {
        const index = conectedUsers.findIndex((element) => element.socketId === socket.id);
        conectedUsers[index] = { nickname: data, socketId: socket.id };
        io.emit('online', conectedUsers);
    });
    socket.on('disconnect', () => {
        conectedUsers = conectedUsers.filter((element) => element.socketId !== socket.id);
        io.emit('online', conectedUsers);
    });
});

socketIoServer.listen(PORT);

console.log(`Socket.ioioioioio ouvindo na porta ${PORT}`);