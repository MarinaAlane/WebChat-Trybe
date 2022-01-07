const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
    const data = new Date();

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const hora = data.getHours();
    const min = data.getMinutes();
    console.log(mes);
    const amOrPm = hora >= 12 ? 'PM' : 'AM';
    const formatDate = `${dia}-${mes}-${ano} ${hora}:${min} ${amOrPm}`;

    io.emit('onlineUser');

    socket.on('message', (msg) => {
        const { nickname, chatMessage } = msg;
        console.log(msg);
        io.emit('message', `${formatDate} ${nickname}: ${chatMessage}`);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));