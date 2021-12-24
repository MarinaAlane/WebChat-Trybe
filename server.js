const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const PORT = '3000';

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('views/chat');
});

io.on('connection', (socket) => {
  console.log(`Novo usuário ${socket.id} conectado ao socket.io`);
});

app.post('/message', (req, res) => {
  const { chatMessage, nickname } = req.body;

  const data = moment().format('LLL');
  console.log(data, chatMessage, nickname);

  io.emit('message', { data: moment().format('LLL'), chatMessage, nickname });

  return res.status(200).json({ chatMessage, nickname });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
