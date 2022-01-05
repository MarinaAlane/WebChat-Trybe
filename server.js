const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });

require('./sockets/chat')(io);
require('./sockets/userList')(io);

const viewRoutes = require('./routes/viewRoutes');

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '/views')));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(viewRoutes);
