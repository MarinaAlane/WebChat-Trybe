const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || '3000';
const server = require('http').createServer(app);

const io = require('socket.io')(server, { 
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const { saveHistory } = require('./models/history');
const { getHistory } = require('./controllers/historys');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
}); 

const users = {};
const getDate = require('./helpers/getDate');

const allMessages = async (socket) => {
  const msg = await getHistory();
  socket.emit('getHistory', msg);
};

io.on('connection', (socket) => {
  users[socket.id] = socket.id.substr(0, 16);
  allMessages(socket);
  socket.emit('newUser', users[socket.id]);
  io.emit('userList', users);

  socket.on('message', async (msg) => {
    const { chatMessage, nickname } = msg;
    await saveHistory(chatMessage, nickname, getDate());
    io.emit('message', `${getDate()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('setNickname', (newNickname) => {
    users[socket.id] = newNickname;
    io.emit('userList', users);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];

    io.emit('nickname', users[socket.id]);
    io.emit('userList', users);
  });
});

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
