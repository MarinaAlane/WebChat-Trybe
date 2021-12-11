const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const PATH_HTML = path.resolve(__dirname, 'public', 'index.html');
const PATH_PUBLIC = path.resolve(__dirname, 'public');

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});
require('./sockets/chat')(io);

app.use(cors());
app.use(express.static(PATH_PUBLIC));

app.get('/', (_req, res) => {
  res.sendFile(PATH_HTML);
});

http.listen(PORT, () => console.log(`ouvindo porta: ${PORT}`));
