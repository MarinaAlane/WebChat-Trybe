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

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    
    socket.on('disconnect', () => {
        console.log('user disconnected :(', socket.id);
    });
    
    socket.on('message', (msg) => {
        console.log(`alguem mandou uma mensagem: ${msg}`);
        const { chatMessage, nickname } = msg;
        const date = new Date();
        const dateActual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const timeActual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const printDados = `${dateActual} ${timeActual} - ${nickname}: ${chatMessage}`;
        io.emit('message', printDados);
    });
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
    console.log('listening on 3000');
});
