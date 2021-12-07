const express = require('express');

const PORT = 3000;
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.use(express.json());

require('./sockets/socketChat')(io);

app.use(express.static(`${__dirname}/public`));

server.listen(PORT, () => {
  console.log(`Server started on http//:localhost:${PORT}`);
});
