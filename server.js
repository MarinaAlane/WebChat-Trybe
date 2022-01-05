const express = require('express');
const http = require('http');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const path = require('path');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

require('./sockets/chat')(io);

server.listen(3000, () => console.log('server online'));