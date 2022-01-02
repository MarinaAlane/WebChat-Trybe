const users = [];

// add user
const userJoin = (id, username) => {
  // take id value
  let lowerCaseName = id;
  // check if username is empty
  if (username !== '') {
    lowerCaseName = username.trim().toLowerCase();
  }
  // save user into an array
  const user = {
    id,
    nickname: lowerCaseName,
  };
  users.push(user);
  // return user summarized
  return user;
};

const updateUser = (id, update) => {
  // check if username is already used and return error if it yes
  const existUser = users.find((e) => (e.nickname === update));
  if (existUser) return { error: 'Username is already being used' };
  // taking user
  const index = users.findIndex((e) => e.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  const user = {
    id,
    nickname: update,
  };
  users.push(user);
  return users;
};

const getAllUsers = () => users;

const getUserById = (id) => users.find((e) => e.id === id);

const removeOne = (id) => {
  const index = users.findIndex((e) => e.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

module.exports = { userJoin, updateUser, getAllUsers, getUserById, removeOne };
