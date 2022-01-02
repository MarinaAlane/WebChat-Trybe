const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
// const { chatRender } = require('./controller/chatControlle');
// const moment = require('moment');
// const { userInfo } = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
require('./socket/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

const PORT = 3000;

server.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
