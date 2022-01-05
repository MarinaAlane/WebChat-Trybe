const cors = require('cors');

const express = require('express');

const Moment = require('moment');

const app = express();

const PORT = 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', (socket) => {
  const randomNickname = socket.id.slice(-16);

  socket.emit('randomNickname', randomNickname);

  socket.on('message', ({ nickname, chatMessage }) => {
    const moment = Moment();
    const formatedDate = moment.format('DD-MM-yyyy hh:mm:ss A');
  
    const formatedMessage = `${formatedDate} - ${nickname}: ${chatMessage}`;
  
    io.emit('message', formatedMessage);
  });
});

app.get('/', (_req, res) => {
  res.render('index');
});

server.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});
