const cors = require('cors');

const express = require('express');

const Moment = require('moment');

const app = express();

const PORT = 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const messages = require('./models/messages');

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const onlineClientsList = [];

const createOnlineClient = (nickname, socketId) => {
  const onlineClient = {
    nickname,
    socketId,
  };
  return onlineClient;
};

const formatMessage = async (nickname, chatMessage) => {
  const moment = Moment();
  const formatedDate = moment.format('DD-MM-yyyy hh:mm:ss A');
  await messages.insertMessage({ nickname, message: chatMessage, timestamp: formatedDate });
  const formatedMessage = `${formatedDate} - ${nickname}: ${chatMessage}`;
  return formatedMessage;
};

const ioEmitOnlineClientsList = (ioSocket) => {
  ioSocket.emit('online-clients', onlineClientsList);
};

const updateNicknameInList = (nickname, socket, ioSocket) => {
  for (let index = 0; index < onlineClientsList.length; index += 1) {
    if (onlineClientsList[index].socketId === socket.id) {
      onlineClientsList[index].nickname = nickname;
    }
  }
  ioEmitOnlineClientsList(ioSocket);
};

const removeUserOnline = (socket, ioSocket) => {
  for (let index = 0; index < onlineClientsList.length; index += 1) {
    if (onlineClientsList[index].socketId === socket.id) {
      onlineClientsList.splice(index, 1);
    }
  }
  ioEmitOnlineClientsList(ioSocket);
};

io.on('connection', async (socket) => {
  const randomNickname = socket.id.slice(-16);
  socket.emit('randomNickname', randomNickname);

  const onlineClient = createOnlineClient(randomNickname, socket.id);

  onlineClientsList.push(onlineClient);
  
  socket.on('updateNickname', (nickname) => {
    updateNicknameInList(nickname, socket, io);
  });

  socket.on('disconnect', () => {
    removeUserOnline(socket, io);
  });
  ioEmitOnlineClientsList(io);

  const previousMessages = await messages.getAllMessages();

  socket.emit('previousMessages', previousMessages);

  socket.on('message', async ({ nickname, chatMessage }) => {
    const formatedMessage = formatMessage(nickname, chatMessage);  
    io.emit('message', formatedMessage);
  });
});

app.get('/', (_req, res) => {
  res.render('index');
});

server.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`);
});
