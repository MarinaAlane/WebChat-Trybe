const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

require('./sockets/messages')(io);
require('./sockets/users')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
