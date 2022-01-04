require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const urlOrigin = `http://localhost:${PORT}`;

const server = require('http').createServer(app);

// app.get('/', (_req, res) => res.render('chat'));

const io = require('socket.io')(server, {
  cors: {
    origin: urlOrigin,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.use(express.static(path.join(__dirname, 'views')));

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('alguem saiu');
  });
  socket.on('message', (msg) => {
    io.emit('serverMessage', { message: msg });
  });
  socket.broadcast.emit('serverMessage', { message: 'fulano entrou' });
});

app.use('/', (req, res) => { 
  res.render('index.ejs');
});

server.listen(PORT, () => {
  console.log(`Servidor na Porta ${PORT}`);
});
