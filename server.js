const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const users = [];

const updateUsers = (updateUser) => {
  const findUser = users.findIndex((user) => user.id === updateUser.id);
  users.splice(findUser, 1);
  users.push(updateUser);
  return users;
};

io.on('connection', (socket) => {
  const userConnected = { id: socket.id, nickname: socket.id.substring(0, 16) };
  users.push(userConnected);
  socket.emit('online-user', users);

  socket.on('disconnect', () => {
    console.log('Alguem se desconectou');
  });

  socket.on('newNickname', (nickName) => {
    const userUpdated = updateUsers(nickName);
    io.emit('online-user', userUpdated);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment(new Date()).format('DD-MM-YYYY, h:mm:ss');
    const message = `${date.toLocaleString()} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
