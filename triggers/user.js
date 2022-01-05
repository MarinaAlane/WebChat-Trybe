const { createUser, getAll, delOneUser, oneById } = require('../models/usersModel');

const users = [];

// add user
const userJoin = async (id, username) => {
  // deleting user, if it exists, within array
  const index = users.findIndex((e) => e.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
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
  const oneUser = await createUser(user);
  // console.log(oneUser);
  // return user summarized
  return oneUser;
};

// const updateUser = (id, update) => {
//   // check if username is already used and return error if it yes
//   const existUser = users.find((e) => (e.nickname === update));
//   if (existUser) return { error: 'Username is already being used' };
//   // taking user
//   const index = users.findIndex((e) => e.id === id);
//   if (index !== -1) {
//     users.splice(index, 1);
//   }
//   console.log('user', users);
//   const user = {
//     id,
//     nickname: update,
//   };
//   users.push(user);
//   console.log('user2', users);
//   return users;
// };

const getAllUsers = async () => {
  // users;
  const all = await getAll();
  return all;
};

const byId = async (id) => {
  const one = await oneById(id);
  console.log('1', one);
  return one;
  // users.find((e) => e.id === id)
};

const removeOne = async (id) => {
  await delOneUser(id);
  const index = users.findIndex((e) => e.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

module.exports = { userJoin, getAllUsers, byId, removeOne };
