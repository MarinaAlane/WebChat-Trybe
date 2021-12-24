const express = require('express');
const path = require('path');

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
  const { message } = req.body;
  console.log(message);

  io.emit('message', message);

  return res.status(200).json({ message });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
