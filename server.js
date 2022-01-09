const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app); // servidor HTTP

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const model = require('./models/messages');

const user = {};
// Sempre que um cliente se conectar ao servidor executa essa função
io.on('connection', async (socket) => {
  const data = moment().format('DD-MM-yyyy HH:mm:ss A');
  // Escuta o evento de message
  socket.on('message', async ({ chatMessage, nickname }) => {
  // vai enviar a mensagem para todos os clientes que tiverem a conexão socket aberta
    io.emit('message', `${data} - ${nickname} - ${chatMessage}`);
    await model.create(data, nickname, chatMessage);
  });
  socket.on('nickname', (nickname) => {
    user[socket.id] = nickname;
    io.emit('loadUsers', Object.values(user));
  });
  // console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.use(express.static(`${__dirname}/public`));
  
app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});