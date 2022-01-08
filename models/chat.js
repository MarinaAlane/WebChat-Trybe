const connection = require('./connection');

const saveMessage = async (message) => {
  const db = await connection();
  const { ops } = await db.collection('messages').insertOne(message);
  return ops;
};

const getAllMessages = async () => {
  const db = await connection();
  const data = await db.collection('messages').find({}).toArray();
  return data;
};

module.exports = {
  saveMessage,
  getAllMessages,
};