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

const controller = require('./controllers/chatController');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(`${__dirname}/views`)));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.use('/', controller);

http.listen(PORT, () => console.log(`Server listening on port -> ${PORT}`));