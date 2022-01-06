const moment = require('moment');
const Messages = require('../controllers/Messages');

const online = [];

const newUser = (socket) => {
  const { id } = socket;
  const baseNickname = id.slice(0, 16);
  online.push({ id, nickname: baseNickname });
  socket.emit('newUser', baseNickname);
};

const message = (socket, io) => {
  socket.on('message', async (msg) => {
    const date = moment().format('DD-MM-YYYY, hh:mm:ss');
    const completeMessage = `${date} - ${msg.nickname}: ${msg.chatMessage}`;
    io.emit('message', completeMessage);
    await Messages.create(msg.nickname, msg.chatMessage, date);
  });
};

const saveNick = (socket, io) => {
  socket.on('saveNick', (nickname) => {
    const index = online.findIndex((user) => user.id === socket.id);
    online[index].nickname = nickname;
    io.emit('users', online);
  });
};

const users = (socket, io) => {
  socket.on('users', () => {
    console.log(online);
    io.emit('users', online);
  });
};

const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const index = online.findIndex((user) => user.id === socket.id);
    online.splice(index, 1); 
    io.emit('users', online); 
  });
};

const getMessages = async (socket) => {
  const list = await Messages.getAll();
  socket.emit('getMessages', list);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    newUser(socket);
    users(socket, io);
    saveNick(socket, io);
    getMessages(socket);
    disconnect(socket, io);
    message(socket, io);
  });
};