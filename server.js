const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/socketChat')(io);
require('./sockets/socketUser')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor funcionando => ${PORT}`);
});
