const model = require('../models/userModel.js');

const getAllUsers = async () => {
  const users = await model.getAllUsers();
  return users;
};

const createUser = async (data) => {
  try {
    await model.createUser(data);
    const userList = await getAllUsers();
    return userList;
  } catch (e) {
    return e.message;
  }
};

const deleteUser = async (socketId) => {
  try {
    await model.deleteUser(socketId);
    const userList = await getAllUsers();
    return userList;
  } catch (e) {
    return e.message;
  }
};

const setName = async ({ oldName, newName }) => {
  try {
    await model.setName({ oldName, newName });
    const userList = await getAllUsers();
    return userList;
  } catch (e) {
    return e.message;
  }
};

const cleanUserList = async (users) => {
  try {
    await model.cleanUserList(users);
    const userList = await getAllUsers();
    return userList;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  setName,
  cleanUserList,
};
