const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(cors());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

require('./socket/chat')(io);

require('./socket/users.js')(io);

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
