const express = require('express');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './public');

require('./sockets/chat')(io);

const message = require('./routes/message');

app.use('/', message);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
