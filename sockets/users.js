const usersArr = [];

const connectUser = (nick) => {
  usersArr.push(nick);
};

const updateUser = ({ oldNick, newNick }) => {
  const index = usersArr.indexOf(oldNick);
  usersArr[index] = newNick;
};

const deleteUser = (nick) => {
  const index = usersArr.indexOf(nick);
  usersArr.splice(index, 1);
};

module.exports = (socket, io) => {
  let currUser;

  socket.on('userConnect', (nick) => {
    connectUser(nick);
    currUser = nick;
    io.emit('attList', usersArr);
  });

  socket.on('userUpdate', ({ oldNick, newNick }) => {
    updateUser({ oldNick, newNick });
    currUser = newNick;
    io.emit('attList', usersArr);
  });

  socket.on('disconnect', () => {
    deleteUser(currUser);
    io.emit('attList', usersArr);
  });
};