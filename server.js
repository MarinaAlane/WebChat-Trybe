// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
const localPORT = process.env.PORT || 3000;
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);
require('./sockets/users')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(localPORT, () => console.log(`Funfando na porta ${localPORT}`));
