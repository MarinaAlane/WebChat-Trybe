// config das live lectures com o mestre frankkkk
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const { PORT = 3000 } = process.env;

function stringGenerator(size) {
    let stringGenerated = '';

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const charactersLength = characters.length;

    for (let i = 0; i < size; i += 1) {
        stringGenerated += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }

    return stringGenerated;
}

const app = express();

const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});

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

app.get('/', (req, res) => {
    res.render('home');
});

io.on('connect', async (socket) => {
    const randomUsername = stringGenerator(16);

    socket.emit('username', randomUsername);

    socket.on('message', (data) => {
        const { nickname, chatMessage } = data;
        const timeFormated = moment().format('DD-MM-yyyy HH:mm:ss');
        io.emit('message', `${timeFormated} - ${nickname}: ${chatMessage}`);
    });
});

socketIoServer.listen(PORT);

console.log(`Socket.ioioioioio ouvindo na porta ${PORT}`);