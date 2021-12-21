const messageController = require('../controller/message');
const { getFormatTime } = require('../middleware/manageMessage');

let allUsers = [];

const createMessage = async (msg, io) => {
  const { timestamp } = getFormatTime();
  await messageController.createMessage(msg, timestamp);

  const { nickname, chatMessage } = msg;
  const message = `${timestamp} - ${nickname}: ${chatMessage}`;

  io.emit('message', message);
};

const listAllMessages = async (io) => {
  const allMessages = await messageController.getAllMessages();
  io.emit('messageHistory', allMessages);
};

const listAllUsers = (socket, io, nickname) => {
  allUsers.push({ id: socket.id, nickname });
  io.emit('getAllUsers', allUsers);
};

const changeUserName = (userData, io) => {
  allUsers.forEach((elem) => {
    if (elem.id === userData.id) {
      Object.assign(elem, userData);
      io.emit('getAllUsers', allUsers);
    }
  });
};

const deleteUser = (userId, io) => {
  allUsers = allUsers.filter(((user) => user.id !== userId));
  io.emit('getAllUsers', allUsers);
};

module.exports = (io) =>
  io.on('connection', async (socket) => {
    await listAllMessages(io);
    socket.on('message', async (msg) => createMessage(msg, io));
    socket.on('connectUser', (nickname) => listAllUsers(socket, io, nickname));
    socket.on('changeUserName', (userData) => changeUserName(userData, io));
    socket.on('onCloseChat', (userId) => deleteUser(userId, io));
});

// for some reason the channel is not updating messages for users that already are in chat
