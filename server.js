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

const { formatDate } = require('./services');

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${formatDate()} ${message.nickname}: ${message.chatMessage}`);
  });
});

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
