const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const { showChat } = require('./controllers/chatController');
const path = require('path');

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(cors());

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

require('./sockets/chat')(io);

app.get('/', showChat);

http.listen(PORT, () => console.log(`Server listening on port -> ${PORT}`));
