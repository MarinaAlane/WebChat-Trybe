const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/main.js')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/main.html`);
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});