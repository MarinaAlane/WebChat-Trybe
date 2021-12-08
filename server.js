// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { format } = require('date-fns');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const socketIoServer = http.createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

io.on('connection', (socket) => {
  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  console.log(`usuário ${socket.id} conectado`);

  socket.on('message', (msg) => {
    io.emit('message', `${timestamp} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectou`);
  });
});

app.get('/', (_req, res) => {
  res.render('board');
});

app.post('/post', async (req, res) => {
  const { chatMessage, nickname } = req.body;

  const getHour = `${new Date().getHours()}`;
  let hourSign = '';
  if (getHour >= 12) {
    hourSign = 'AM';
  } hourSign = 'PM';

  const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

  if (!chatMessage || !nickname) {
    return res.status(422).json({ message: 'Falta enviar sua mensagem ou nickname' });
  }
  
  io.emit('message', `${timestamp} ${hourSign} ${nickname} ${chatMessage}`);

  return res.status(200).json({ nickname, chatMessage });
});

socketIoServer.listen(PORT, () => {
  console.log(`Servidor Socket.io ouvindo na porta ${PORT}`);
});
