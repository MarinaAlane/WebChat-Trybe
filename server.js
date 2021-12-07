// Faça seu código aqui
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

require('./sockets/webchat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/webchat.html`));
http.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
