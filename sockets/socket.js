const moment = require('moment');
const chatController = require('../controllers/chatController');

const timestamp = moment().format('MM-DD-YYYY h:mm:ss A');

const getUsers = ({ io, nicknames }) => io.emit('online', nicknames);

let nicknames = [];

const emitUser = ({ io, id, nickname, action }) => {
  if (action === 'newUser') {
    nicknames.push({ id, nickname });
    return getUsers({ io, nicknames });
  }

  const filteredUsers = nicknames.filter((user) => user.id !== id);
  nicknames = filteredUsers;
  nicknames.push({ id, nickname });
  getUsers({ io, nicknames });
};

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('user', ({ nickname, action }) => emitUser({ io, id, nickname, action }));
  socket.on('message', async ({ chatMessage: message, nickname }) => {
    await chatController.create({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('disconnect', () => {
    const filteredUsers = nicknames.filter((user) => user.id !== id);

    nicknames = filteredUsers;
    getUsers({ io, nicknames });
  });

  socket.on('nickname', () => {
    socket.emit('nickname', socket.id);
  });
});