let usersList = [];
const userClient = {};

function newUser(user, io) {
  usersList.push(user);
  io.emit('renderList', usersList);
  console.log(usersList);
  userClient[user] = user;
}

function removeUser(removedUser, io) {
  usersList = usersList.filter((user) => user !== removedUser);
  io.emit('renderList', usersList);
  console.log(usersList);
}

function changenameUser(lastedName, changedName, io) {
  const position = usersList.indexOf(lastedName);
  usersList[position] = changedName;
  io.emit('renderList', usersList);

  console.log(usersList);
}

module.exports = (io) => io.on('connection', async (socket) => {
  newUser(socket.id.substr(0, 16), io);
  socket.on('sendUsername', (username) => {
    console.log({ username });
  });

  socket.on('changeName', (lastName, newName) => {
    changenameUser(lastName, newName, io);
    userClient[socket.id.substr(0, 16)] = newName;
  });

  socket.on('disconnect', async () => {
    console.log(`usuario disconectado ${socket.id.substr(0, 16)}`);
    removeUser(userClient[socket.id.substr(0, 16)], io);
  });
});
