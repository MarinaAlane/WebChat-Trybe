const messages = [];
const users = [];
const socketsUsers = {};

const removeUser = (socket) => {
  const nickname = socketsUsers[socket.id];
  const index = users.indexOf(nickname);
  users.splice(index, 1);
  return users;
};

const changeNickname = (socket, nickname, newNickname) => {
  socketsUsers[socket.id] = nickname;
  const index = users.indexOf(nickname);
  users[index] = newNickname;
  return users;
};

const createUser = (socket, nickname) => {
  socketsUsers[socket.id] = nickname;
  users.push(nickname);
  return users;
};

const getMessages = () => messages;

const insertMessage = (message) => {
  messages.push(message);
};

const getUsers = () => users;

module.exports = {
  changeNickname,
  createUser,
  insertMessage,
  getMessages,
  getUsers,
  removeUser,
};
