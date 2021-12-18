const connection = require('./connection');

const getAllUsers = async () => {
  const db = await connection();
  const result = await db.collection('users').find().toArray();
  return result;
};

const createUser = async ({ nickname, socketId }) => {
  const db = await connection();
  const userExists = await findUser(nickname);
  if (userExists) return userExists;
  const result = await db.collection('users').insertOne({ nickname, socketId });
  return result;
};

const deleteUser = async (socketId) => {
  const db = await connection();
  const result = await db.collection('users').deleteOne({ socketId });
  return result;
};

const setName = async ({ oldName, newName }) => {
  const db = await connection();
  const result = await db
    .collection('users')
    .updateOne({ nickname: oldName }, { $set: { nickname: newName } });
  return result;
};

const cleanUserList = async (users) => {
  console.log('VRAU');
  const db = await connection();
  const result = await db.collection('users').deleteMany({
    socketId: { $nin: users },
  });
  return result;
};

const findUser = async (nickname) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ nickname });
  return result;
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  setName,
  cleanUserList,
  findUser,
};
