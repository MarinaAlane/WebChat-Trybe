const { storeMsg } = require('../controllers/chatController');

const formatMessage = ({ nickname, chatMessage }, date) => `${date} - ${nickname}: ${chatMessage}`;

let users = [];

const changeNickname = (nicknames) => {
  users = users.map((user) => {
    if (user.nickname === nicknames.oldUser) return { nickname: nicknames.newUser, id: user.id };
    return user;
  });
};

const handleMessage = (message) => {
  const date = new Date().toLocaleString().replace(/\//gi, '-');
  storeMsg(message, date);
  const newMsg = formatMessage(message, date);
  return newMsg;
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('nickname', `${socket.id.slice(0, 16)}`);
  users.push({
    id: socket.id,
    nickname: socket.id.slice(0, 16),
  });
  io.emit('userList', users);

  socket.on('message', (message) => {
    const newMsg = handleMessage(message);
    io.emit('message', newMsg);
  });

  socket.on('changeNickname', (nicknames) => {
    changeNickname(nicknames);
    io.emit('userList', users);
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    socket.broadcast.emit('userList', users);
  });
});
