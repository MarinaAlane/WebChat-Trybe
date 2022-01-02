const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('Alguem se desconectou');
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    const message = `${date.toLocaleString()} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });

  // socket.emit('welcome', ('Seja bem vindo(a) ao Web Chat'));

  socket.broadcast.emit('serverMessage', { message: 'Uma nova pessoa se conectou' });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

// require('./sockets/chat')(io);
