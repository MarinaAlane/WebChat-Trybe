const express = require('express');

const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

const model = require('./models/chat');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/chat.html`);
});

const PORT = 3000;
// adiciona lógica socket direto no server
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('updateNickname', (nickname) => {
    console.log({ nickname });
    io.emit('updateNickname', nickname);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

io.on('connection', async (socket) => {
  const messages = await model.getAll();
  socket.emit('history', messages);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
    model.saveMessage({ message: chatMessage, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`)); 