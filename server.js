const express = require('express');

const app = express();

const PORT = 3000;
const server = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

const modelMessages = require('./src/models/modelMessages');

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './src/public')));

app.get('/chat', async (_req, res) => {
  const allMessages = await modelMessages.getAllMessages();
  return res.status(200).json(allMessages);
});

app.post('/', async (req, res) => {
  const newMessage = await modelMessages.createMessages(req.body);
  return res.status(201).json(newMessage);
});

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

require('./src/sockets/chat')(io);

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));