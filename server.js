const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getMessages } = require('./controllers/messages');
const { create } = require('./models/messages');

const users = [];
const onlineUser = 'online-user';
const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');

const updateUsers = (updateUser) => {
  const findUser = users.findIndex((user) => user.id === updateUser.id);
  users.splice(findUser, 1);
  users.push(updateUser);
  return users;
};

const disconnectUser = (userDisconnected) => {
  const userRemoved = users.findIndex((user) => user.id === userDisconnected);
  users.splice(userRemoved, 1);
  return true;
};

io.on('connection', (socket) => {
  const userConnected = { id: socket.id, nickname: socket.id.substring(0, 16) };
  users.push(userConnected);
  socket.emit(onlineUser, users);

  socket.on('newNickname', (nickName) => {
    const userUpdated = updateUsers(nickName);
    io.emit(onlineUser, userUpdated);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    await create(chatMessage, nickname, date);
    const message = `${date} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    disconnectUser(socket.id);
    io.emit(onlineUser, users);
  });

  socket.broadcast.emit(onlineUser, users);
});

app.use(cors());

app.get('/', getMessages);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
