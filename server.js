const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const Message = require('./models/Message');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

const connectedUsers = [];

const getDate = () => {
  const time = new Date();
  const day = time.getDay();
  const month = time.getMonth();
  const year = time.getFullYear();
  return `${day}-${month}-${year} ${time.toLocaleTimeString('en-US')}`;
};

const onConnectUser = (socket) => ({ nickname }) => {
    const index = connectedUsers.findIndex((user) => user.id === socket.id);
    if (index === -1) {
 connectedUsers.push({ id: socket.id, nickname });
    } else {
      connectedUsers[index] = { id: socket.id, nickname };
    }
    io.emit('updateConnectedUsers', connectedUsers);
  };

io.on('connection', (socket) => {
  socket.on('connectUser', onConnectUser(socket));

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getDate();
    Message.create({ date, nickname, chatMessage });
    io.emit('message', `${date} ${nickname} ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    const index = connectedUsers.findIndex((user) => user.id === socket.id);
    connectedUsers.splice(index, 1);
    io.emit('updateConnectedUsers', connectedUsers);
  });
});

app.get('/', async (req, res) => {
  const messages = await Message.getAll();
  const formattedMessages = messages
    .map(({ date, nickname, chatMessage }) => `${date} ${nickname} ${chatMessage}`);
  res.status(200).render('index', { messages: formattedMessages, connectedUsers });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
