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
    const nickname = generateNickname();
    socket.emit('getNickname', nickname);

    socket.broadcast.emit('newLogin', nickname);

    socket.on('newLogin', (userNickname) => {
      socket.broadcast.emit('addNewLogin', userNickname);
    });

    socket.on('connectUser', (name) => listAllUsers(socket, io, name));
    socket.on('changeUserName', (userData) => changeUserName(userData, io));
    socket.on('onCloseChat', (userId) => deleteUser(userId, io));
});
