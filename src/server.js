// Faça seu código aqui -

const express = require('express');

const app = express();
const socketIo = require('socket.io');
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const PORT = 3000;

const io = socketIo(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

const { showChat } = require('./controllers/chatController');

app.use(cors());

app.use(express.static(path.join(`${__dirname}/views`)));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

require('./sockets/chat')(io);

app.get('/', showChat);

http.listen(PORT, () => console.log(`Server listening on port -> ${PORT}`));