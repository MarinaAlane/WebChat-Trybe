// Faça seu código aqui
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

const UsersIO = require('./sockets/users');
const MessagesIO = require('./sockets/messages');
const { getAllMessages } = require('./models/messages');

io.on('connection', (socket) => {
  UsersIO(io, socket);
  MessagesIO(io, socket);
});

// https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
const randomNick = () => (
  Array.from(Array(16), () => Math.floor(Math.random() * 36).toString(36)).join('')
);

app.use(express.static('./view'));

app.set('view engine', 'ejs');
app.set('views', './view');

app.get('/', async (_req, res) => {
  const Messages = await getAllMessages();

  res.status(200).render('chat.ejs', {
    userNick: randomNick(),
    storageMessages: Messages,
  });
});

const PORT = 3000;

httpServer.listen(PORT, () => console.log(`API running on port: ${PORT}`));