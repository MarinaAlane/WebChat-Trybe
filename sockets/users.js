const allUsersArray = [];

const connectUser = (nick) => {
  allUsersArray.push(nick);
};

const updateUser = ({ oldNickname, newNickname }) => {
  const index = allUsersArray.indexOf(oldNickname);
  allUsersArray.splice(index, 1, newNickname);
};

const deleteUser = (nick) => {
  const index = allUsersArray.indexOf(nick);
  allUsersArray.splice(index, 1);
};

module.exports = (socket, io) => {
  let currentUser;

  socket.on('userConnect', (nick) => {
    connectUser(nick);
    currentUser = nick;
    io.emit('userListAtt', allUsersArray);
  });

  socket.on('userUpdate', ({ oldNickname, newNickname }) => {
    updateUser({ oldNickname, newNickname });
    currentUser = newNickname;
    io.emit('userListAtt', allUsersArray);
  });

  socket.on('disconnect', () => {
    deleteUser(currentUser);
    io.emit('userListAtt', allUsersArray);
  });
};