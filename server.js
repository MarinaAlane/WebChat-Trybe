const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
// http -> servidor HTTP
const http = require('http').createServer(app);

// limitar quem tem acesso a aplicação
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/chatServer')(io);

http.listen(PORT, () => console.log(`Listening in ${PORT}`));
