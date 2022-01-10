const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { generateDate } = require('./utility/date');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
  res.status(200).render('index');
});

io.on('connection', (socket) => {
  const date = generateDate();
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${date} ${nickname}: ${chatMessage}`);
  });
});