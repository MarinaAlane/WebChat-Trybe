const express = require('express');
const moment = require('moment');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: { origin: `http://localhost:${PORT}`, methods: ['GET', 'POST'] },
});

const { sendMessageToDB, getMessageFromDB } = require('./models/webchat');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

const nick = {};

io.on('connection', async (socket) => {
  console.log(`Usuário: ${socket.id} conectado!`); nick[socket.id] = socket.id.slice(0, 16);

  socket.on('disconnect', () => {
    console.log(`Usuário: ${socket.id} está desconectado!`);
    delete nick[socket.id]; io.emit('onlineUser', Object.values(nick)); 
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeLog = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${timeLog} ${nickname}: ${chatMessage}`);
    await sendMessageToDB({ timeLog, nickname, chatMessage });
  });

  socket.on('novoUsername', (nickname) => {
    nick[socket.id] = nickname; io.emit('onlineUser', Object.values(nick));
  });

  const logDeMensagens = async () => {
    const mensagens = await getMessageFromDB(); return mensagens;
  };

  io.emit('logDeMensagens', await logDeMensagens());
  io.emit('onlineUser', Object.values(nick));
});

app.get('/', (req, res) => { res.render('index'); });

http.listen(3000, () => { console.log(`Server listen PORT ${PORT}`); });
