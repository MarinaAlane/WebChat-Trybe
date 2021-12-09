const generateDate = require('../utils/generateDate');
const controller = require('../controllers/chatController');

const users = [];

const updateNick = ({ nickname, oldNickname }) => {
  const user = users.find((userNick) => userNick.nick === oldNickname);
    user.nick = nickname;
};

const createMessage = async ({ chatMessage, nickname }) => {
  const messageDate = await generateDate();
  await controller.create({ chatMessage, nickname, messageDate });
  const message = `${messageDate} - ${nickname}: ${chatMessage}`;
  return message;
};

const removeUser = (id) => {
  const userDisconnect = users.find((user) => user.socketId === id);
  users.splice(users.indexOf(userDisconnect), 1);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', async (nick) => {
    await users.push({ nick, socketId: socket.id }); io.emit('usersOn', users);
  });
  socket.on('updateNick', async ({ nickname, oldNickname }) => {
    await updateNick({ nickname, oldNickname }); io.emit('usersOn', users);
  });
  socket.on('disconnect', async () => {
    await removeUser(socket.id); io.emit('usersOn', users);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const message = await createMessage({ chatMessage, nickname }); io.emit('message', message);
  });
  socket.on('getHistory', async () => {
    const history = await controller.getAll(); io.emit('history', history);
  });
});