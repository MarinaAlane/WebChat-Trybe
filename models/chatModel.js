const connection = require('./connection');

const create = async (message) => {
  const db = await connection();
  const response = await db.collection('messages').insertOne(message);
  const res = { _id: response.insertedId, ...message };
  return res;
};

const getAll = async () => {
  const db = await connection();
  const response = await db.collection('messages').find().toArray();
  return response;
};

module.exports = {
  getAll,
  create,
};
