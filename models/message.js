const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const msg = await db.collection('messages').find().toArray();
  return msg;
};
  
const saveHistory = async (message) => {
  const db = await connection();
  const messages = await db.collection('messages').insertOne(message);
  return messages;
};

module.exports = {
  getAll,
  saveHistory,
};
