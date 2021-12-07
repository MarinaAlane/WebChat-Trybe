require('dotenv').config();

const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const options = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};

const io = require('socket.io')(http, options);

require('./sockets/messages')(io);

http.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
