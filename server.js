const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getMessages } = require('./models/saveMessages');

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.get('/messagesHistory', async (req, res) => {
  const messages = await getMessages();
  return res.json(messages);
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});