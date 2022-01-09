const moment = require('moment');

const usrsOnline = [];

const createUser = (socket) => {
  const { id } = socket;
  const newId = id.substr(0, 16);
  usrsOnline.push({ id, nickname: newId });
  socket.emit('newUser', newId);
};

const newMsg = (socket, io) => {
  const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
};

const newNickname = (socket, io) => {
  socket.on('saveNickname', (newNick) => {
    const userIndex = usrsOnline.findIndex((user) => user.id === socket.id);
    usrsOnline[userIndex].nickname = newNick;
    io.emit('usrsOnline', usrsOnline);
  });
};

const updateUsersOnline = (socket, io) => {
  socket.on('usrsOnline', () => {
    io.emit('usrsOnline', usrsOnline);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    newMsg(socket, io);
    createUser(socket);
    newNickname(socket, io);
    updateUsersOnline(socket, io);
  });
};