// Faça seu código aqui
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const http = require('http');

const server = http.createServer(app);
const path = require('path');
const cors = require('cors');

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const HTML_PUBLIC = path.resolve(__dirname, 'public', 'index.html');
const PATH_PUBLIC = path.resolve(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PATH_PUBLIC));
app.use(cors());

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(HTML_PUBLIC);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
