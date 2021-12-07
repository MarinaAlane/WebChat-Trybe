const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/view`));

require('./sockets/chat')(io);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));