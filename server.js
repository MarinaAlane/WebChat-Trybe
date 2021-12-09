const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

const ChatController = require('./controllers/ChatController');

const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.use('/', ChatController);

require('./socket/Chat')(io);

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
