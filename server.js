// Desenvolvido levando em conta o plantão dado pelo John
const express = require('express');
const moment = require('moment');

require('dotenv').config();

const app = express();
const { PORT } = process.env;

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController');

const onlineUsers = [];

// Listener de conexão
io.on('connection', (socket) => { 
  // Definição do código do usuário nessa conexão
  onlineUsers[socket.id] = socket.id.substring(0, 16);
  
  // Emissão dos usuários online para o VIEW
  io.emit('connectedUsers', Object.values(onlineUsers));

  // Definição do formato da data
  const date = moment().format('DD-MM-YYYY hh:mm:ss');
  
  // Listener para a criação da mensagem
  socket.on('message', async ({ message, nickname }) => {
    // ROTA POST
    await chatController.postMessage(message, nickname, date);
    // Emissão do formato para exibir na tela
    io.emit('message', `${date} - ${nickname} : ${message}`);
  });

  // Listener para mudar o apelido
  socket.on('nickname', (nickname) => {
    onlineUsers[socket.id] = nickname;
   io.emit('connectedUsers', Object.values(onlineUsers));
  });

  // Listener para quando um usuário sai da página
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('connectedUsers', Object.values(onlineUsers));
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

// ROTA GET
app.get('/', chatController.getMessagesHistory);

socketIoServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}!`));
