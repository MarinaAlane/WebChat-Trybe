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

// app.use(express.static(path.join('views')));
// app.set('views', path.join('views'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectado`);

  socket.on('message', (msg) => {
    const { nickname, chatMessage } = msg;
    io.emit('message', `${fulldate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado`);
  });
});

server.listen(PORT, () => console.log('Ouvindo a porta 3000'));