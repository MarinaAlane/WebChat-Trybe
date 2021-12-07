const connection = require('./connection');

const create = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const inserted = await db.collection('messages')
    .insertOne({ message, nickname, timestamp });
  return inserted;
};

const getAll = async () => {
  const db = await connection();
  const get = await db.collection('messages').find().toArray();
  return get;
};

module.exports = {
  create,
  getAll,
};