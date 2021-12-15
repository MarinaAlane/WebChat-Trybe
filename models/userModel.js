const connection = require('./connection');

const createUser = async (nickname) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({ id: nickname, randomNick: nickname });
  return addUser;
};

const findById = async (id) => {
  const db = await connection();
  const response = await db.collection('users').findOne({ id });
  return response.randomNick;
};

const findAndUpdateUser = async (randomNick, nick) => {
  const db = await connection();
  const user = await db.collection('users')
  .updateOne({ randomNick }, { $set: { randomNick: nick } });
  return user;
};

const getAllUsers = async () => {
  const db = await connection();
  const response = await db.collection('users').find().toArray();
  return response;
};

const deleteUser = async (randomNick) => {
  const db = await connection();
  const response = await db.collection('users').deleteOne({ id: randomNick });
  return response;
};

module.exports = { createUser, findAndUpdateUser, getAllUsers, deleteUser, findById };