const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const messagesController = require('./controllers/message');

app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/messages/new', messagesController.getAllMessages);
app.post('/api/messages/all', messagesController.insertMessage);

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
