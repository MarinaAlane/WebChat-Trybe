const express = require('express');
const path = require('path');

// a data foi feita através de estudo de como poderia simplificar esse sistema, e encontrei nesse site: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth()).padStart(2, '0');
const year = date.getFullYear();
const hours = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const fulldate = `${day}-${month}-${year} ${hours}`;

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

app.set(express.static(path.join('views')));
app.set('views', path.join('views'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

let arrayUsers = [];

const messages = require('./models/message');

io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.id} conectado`);
  // Marcelo Leite me deu uma dica nessa lógica porque estava comlicando demais essa randomização
  arrayUsers[socket.id] = socket.id.slice(0, 16);
  socket.emit('logIn', Object.values(arrayUsers));

  io.on('disconnect', () => {
    arrayUsers = arrayUsers.filter((user) => user.id === socket.id);
    io.emit('userOnline', arrayUsers);
  });
    socket.on('message', async (msg) => {
      const { nickname, chatMessage } = msg;
      await messages.createMessage({ nickname, chatMessage });
      io.emit('message', `${fulldate} - ${nickname}: ${chatMessage}`);
    });
    socket.emit('chat', await messages.getAll());

    socket.on('Nickname', (nickname) => {
      arrayUsers[socket.id] = nickname;
      io.emit('userOnline', Object.values(arrayUsers));
    });
});

server.listen(PORT, () => console.log('Ouvindo a porta 3000'));