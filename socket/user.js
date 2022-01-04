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

module.exports = (io) =>
  io.on('connection', async (socket) => {
    let nickname = generateNickname();

    socket.emit('getNickname', nickname);

    socket.broadcast.emit('newLogin', nickname);

    socket.on('newLogin', (userNickname) => {
      socket.broadcast.emit('addNewLogin', userNickname);
    });

    socket.on('changeUserName', (userData) => {
      io.emit('changeUserName', { oldNickname: nickname, newNickname: userData });
      nickname = userData;
    });

    socket.on('disconnet', () => {
      io.emit('removeUserNickname', nickname);
    });
  });
