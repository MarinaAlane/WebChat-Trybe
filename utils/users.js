const { getAll } = require('../models/messages');

const users = [];
const socketsUsers = {};

const changeNickname = (socket, currentNickname, nickname) => {
  socketsUsers[socket.id] = nickname;
  const index = users.indexOf(currentNickname);
  users[index] = nickname;
  console.log(`Changed ${currentNickname} to ${nickname}`);
  return users;
};

const createUser = (socket, currentNickname) => {
  socketsUsers[socket.id] = currentNickname;
  users.push(currentNickname);
  console.log(`Created: ${currentNickname}`);
  return users;
};

const mapMessages = async () => {
  const objectMessages = await getAll();
  return objectMessages.map((object) => `${object.timestamp
  } - ${object.nickname}: ${object.message}`);
};

const removeUser = (socket) => {
  const nickname = socketsUsers[socket.id];
  const index = users.indexOf(nickname);
  users.splice(index, 1);
  console.log(`Removed: ${nickname}`);
  return users;
};

const getUsers = () => users;

module.exports = {
  changeNickname,
  createUser,
  getUsers,
  mapMessages,
  removeUser,
};