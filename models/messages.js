const connection = require('./connection');

const create = async (data, nickname, chatMessage) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ data, nickname, chatMessage });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};

module.exports = {
  create,
  getAll,
};