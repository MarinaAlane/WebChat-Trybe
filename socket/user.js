const generateNickname = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let randomName = '';
  const passwordLength = 15;

  const randomNumber = Math.floor(Math.random() * chars.length);
  for (let i = 0; i <= passwordLength; i += 1) {
    randomName += chars.substring(randomNumber, randomNumber + 1);
  }
  return randomName;
};

let allUsers = [];

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
    socket.on('connectUser', (nickname) => listAllUsers(socket, io, nickname));
    socket.on('changeUserName', (userData) => changeUserName(userData, io));
    socket.on('onCloseChat', (userId) => deleteUser(userId, io));
});

// for some reason the channel is not updating messages for users that already are in chat
