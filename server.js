const cors = require('cors');
const express = require('express');
const app = express();

const PORT = 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});
