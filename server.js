const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const Messages = require('./service/message');

app.use(cors());
app.set(express.static(path.join('views')));
app.set('views', path.join('views'));

app.post('/', async (req, res) => {
  const msg = await Messages.saveHistory(req.body);
  return res.status(201).json(msg);
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/webchat', async (_req, res) => {
  const msg = await Messages.getAll();
  res.status(200).json(msg);
});

require('./sockets/webchat.js')(io);

server.listen(PORT, () => console.log('Ouvindo a porta 3000'));