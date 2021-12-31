const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', './index.html')));

http.listen(port, () => console.log(`listening on port ${port}!`));
