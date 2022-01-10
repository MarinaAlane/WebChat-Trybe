const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { format } = require('date-fns');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: '*',
  methods: ['GET', 'POST'],
});

const date = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

// run all sockets listeners
// require('./socketio')(io);

const cors = require('cors');
const path = require('path');
const webchatModel = require('./models/webchatModel');
const OnlineUsers = require('./public/js/onlineUsersServer');

const nextErrors = require('./errors/nextErrors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => res.redirect('/webchat'));

app.get('/webchat', (req, res, next) => {
  try {
    return res.render('webchat');
  } catch (err) {
    next(err);
  }
});

const onlineUsers = OnlineUsers();

// eu juro q detesto esse lint
const onConnectFncTmp = async (socket) => {
  onlineUsers.addUser(socket.id);
  const list = onlineUsers.getList();
  io.emit('render-online-users', list);

  const messages = await webchatModel.getMessages();
  socket.emit('render-chat-messages', messages);
};

io.on('connection', async (socket) => {
  console.log('user', socket.id, 'conectou');

  await onConnectFncTmp(socket);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const timestamp = date;
    webchatModel.addMessage({ message: chatMessage, nickname, timestamp });
    const newMessage = `${timestamp} ${nickname}: ${chatMessage}`;
    io.emit('message', newMessage);
  });

  socket.on('change-nickname', ({ nickname, userId }) => {
    onlineUsers.changeNickname(nickname, userId);
    const newList = onlineUsers.getList();
    io.emit('render-online-users', newList);
  });

  socket.on('disconnect', () => {
    onlineUsers.delUser(socket.id);
    io.emit('del-user', socket.id);
    console.log('user', socket.id, 'desconectou');
  });
});

app.use(nextErrors);

module.exports = server;