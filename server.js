const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3000;
const http = require('http').createServer(app);
const path = require('path');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./socket')(io); 

app.use(cors());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(PORT, () => console.log(`Estamos online na ${PORT}`));

// https://github.com/tryber/sd-011-project-webchat/pull/140 pr colega ref - Ana Giordani
// https://github.com/tryber/sd-011-project-webchat/pull/117 pr colega ref - Gustavo Lemes
