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

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const time = new Date();
    const day = time.getDay();
    const month = time.getMonth();
    const year = time.getFullYear();
    const date = `${day}-${month}-${year} ${time.toLocaleTimeString('en-US')}`;

    Message.create({ date, nickname, chatMessage });
    
    io.emit('message', `${date} ${nickname} ${chatMessage}`);
  });
});

app.get('/', async (req, res) => {
  const messages = await Message.getAll();
  const formattedMessages = messages
    .map(({ date, nickname, chatMessage }) => `${date} ${nickname} ${chatMessage}`);
  res.status(200).render('index', { messages: formattedMessages });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});