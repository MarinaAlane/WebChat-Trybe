let arrayUsersOnline = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, 16);
    arrayUsersOnline.push({ userNickName: randNameId });
    io.emit('usersOnline', arrayUsersOnline);

    socket.on('changeNickName', (nickname) => {
      const index = arrayUsersOnline.findIndex(({ userNickName }) =>
        userNickName === randNameId || userNickName === nickname);

      arrayUsersOnline[index].userNickName = nickname;
      io.emit('usersOnline', arrayUsersOnline);
    });

    socket.on('disconnect', () => {
      //   const index = arrayUsersOnline.findIndex(({ userNickName }) =>
      //   userNickName === randNameId || userNickName === nickname);
      // delete arrayUsersOnline[index];
      const newArray = arrayUsersOnline.filter(({ userNickName }) => userNickName !== randNameId);
      arrayUsersOnline = newArray;
      io.emit('usersOnline', arrayUsersOnline);
    });
  });
};
