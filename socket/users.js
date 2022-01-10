let allUsers = [];
const users = {};

const newUser = (user, io) => {
  allUsers.push(user);
  io.emit('renderList', allUsers);
  users[user] = user;
};

const removeUser = (removedUser, io) => {
  allUsers = allUsers.filter((user) => user !== removedUser);
  io.emit('renderList', allUsers);
};

const changeUserName = (lastName, changeName, io) => {
  const position = allUsers.indexOf(lastName);
  allUsers[position] = changeName;
  io.emit('renderList', allUsers);

  console.log(allUsers);
};

module.exports = (io) => io.on('connection', async (socket) => {
  newUser(socket.id.substr(0, 16), io);
  socket.on('sendUsername', (username) => {
    console.log({ username });
  });

  socket.on('changeName', (lastName, newName) => {
    changeUserName(lastName, newName, io);
    users[socket.id.substr(0, 16)] = newName;
  });

  socket.on('disconnect', async () => {
    console.log(`usuario disconectado ${socket.id.substr(0, 16)}`);
    removeUser(users[socket.id.substr(0, 16)], io);
  });
});
