const express = require('express');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
