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

const updateUsers = (updateUser) => {
  const findUser = users.findIndex((user) => user.id === updateUser.id);
  users.splice(findUser, 1);
  users.push(updateUser);
  return users;
};

io.on('connection', (socket) => {
  const userConnected = { id: socket.id, nickname: socket.id.substring(0, 16) };
  // sessionStorage.setItem('user', 'userConnected');
  users.push(userConnected);
  socket.emit(onlineUser, users);

  socket.broadcast.emit(onlineUser, users);

  socket.on('disconnect', () => {
    console.log('Alguem se desconectou');
  });

  socket.on('newNickname', (nickName) => {
    const userUpdated = updateUsers(nickName);
    io.emit(onlineUser, userUpdated);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    await create(chatMessage, nickname, date.toLocaleString());
    const message = `${date.toLocaleString()} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});

app.use(cors());

app.get('/', getMessages);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
