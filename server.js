// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

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
    origin: `http://localhost:3000${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.get('/board', (_req, res) => {
  res.render('board');
});

app.post('/post', async (req, res) => {
  const { chatMessage, nickname } = req.body;

  const message = {
    nickname, chatMessage,
  };

  const getHour = `${new Date().getHours()}`;
  let hourSign = '';
  if (getHour >= 12) {
    hourSign = 'AM';
  } hourSign = 'PM';

  const timestamp = await `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  if (!message) return res.status(422).json({ message: 'Falta enviar sua mensagem' });
  
  io.emit('message', `${timestamp} ${hourSign} ${nickname} ${chatMessage}`);

  return res.status(200).json(message);
});

socketIoServer.listen(PORT, () => {
  console.log(`Servidor Socket.io ouvindo na porta ${PORT}`);
});
