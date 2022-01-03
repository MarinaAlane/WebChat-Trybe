const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { format } = require('date-fns');

const app = express();
const PORT = 3000;

let users = [];

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
  // console.log(`usuário ${socket.id} conectado`);

  let id = socket.id.slice(0, 16);
  users.push(id);
  socket.broadcast.emit('connection', id);

  socket.emit('usersConected', users);

  socket.on('updateNickname', ({ oldNickname, newNickname }) => {
    id = newNickname;
    users = users.map((value) => (value === oldNickname ? newNickname : value));
    socket.broadcast.emit('updateUsers', oldNickname, newNickname);
  });
  
  socket.on('message', (msg) => {
    const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    io.emit('message', `${timestamp} - ${msg.nickname}: ${msg.chatMessage}`);
  });

  socket.on('disconnect', () => {
    // console.log(`usuário ${socket.id} desconectou`);
  });
});

app.get('/', (_req, res) => {
  res.render('board');
});

socketIoServer.listen(PORT, () => {
  console.log(`Servidor Socket.io ouvindo na porta ${PORT}`);
});
