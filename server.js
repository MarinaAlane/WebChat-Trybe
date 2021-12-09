require('dotenv').config('./.env');

const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(path.join(`${__dirname}/public`)));

const PORT = process.env.PORT || 3000;
const options = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};
const io = require('socket.io')(http, options);

require('./src/sockets/messages')(io);
require('./src/sockets/users')(io);

app.get(
  '/',
  (_req, res) => res.sendFile(path.join(`${__dirname}/public`)),
);

http.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));