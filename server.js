const express = require('express');
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 3000;

app.use(bodyParser());
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

app.use(express.static(__dirname + '/view'));

require('./sockets/chat')(io);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));