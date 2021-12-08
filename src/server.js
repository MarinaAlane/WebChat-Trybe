const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('id', { newId: socket.id, olderId: '' });

  socket.on('id', (id) => {
    socket.emit('id', id);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('en-GB');
    const formatedDate = date.replace(/\//g, '-').replace(/,/, '');
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);

    axios.post('http://localhost:3000', {
      message: chatMessage,
      timestamp: formatedDate,
      nickname,
    });
  });
});

const { saveMessage, getAllMessages } = require('./controllers/messages');

app.post('/', saveMessage);

app.get('/messages', getAllMessages);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/view/index.html`);
});

http.listen(3000, () => {
  console.log(`Listening at port: ${3000}`);
});
