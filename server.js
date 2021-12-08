const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/main.js')(io);
require('./utils/getBrazilianDate')();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/main.html`);
});

/** */
app.get('/hello', (_, res) => res.send('Hello World'));
/** */

http.listen(3000, () => console.log('Running on 3000'));
// Este código foi retirado dos ensinamentos de Socket.io aplicados na Trybe.